'use strict';

var assert = require('node:assert');
var childProcess = require('node:child_process');
var fs = require('node:fs');
var test = require('node:test');
var plistFixture = fs.readFileSync('./fixtures/fixture.plist', { encoding: 'UTF-8' });

function loadWithExecFile(execFile){
  var originalExecFile = childProcess.execFile;

  childProcess.execFile = execFile;
  delete require.cache[require.resolve('./')];

  var entitlements = require('./');
  childProcess.execFile = originalExecFile;

  return entitlements;
}

test('calls codesign without a shell and parses the plist output', function(){
  var calls = [];
  var result;
  var entitlements = loadWithExecFile(function(file, args, callback){
    calls.push({ file: file, args: args });
    callback(null, plistFixture);
  });

  entitlements('./Payload/Facebook.app', function(error, data){
    result = { error: error, data: data };
  });

  assert.equal(result.error, null);
  assert.deepEqual(result.data, {
    'application-identifier': 'com.facebook.facebook',
    'get-task-allow': false
  });
  assert.deepEqual(calls, [{
    file: 'codesign',
    args: ['-d', '--entitlements', '-', '--xml', '--', './Payload/Facebook.app']
  }]);
});

test('passes shell metacharacters as part of a single path argument', function(){
  var call;
  var unsafePath = './Payload/Facebook.app"; touch /tmp/entitlements-pwned; #';
  var entitlements = loadWithExecFile(function(file, args, callback){
    call = { file: file, args: args };
    callback(null, plistFixture);
  });

  entitlements(unsafePath, function(error){
    assert.equal(error, null);
  });

  assert.equal(call.file, 'codesign');
  assert.equal(call.args[call.args.length - 1], unsafePath);
});

test('terminates codesign options before a path beginning with a dash', function(){
  var call;
  var entitlements = loadWithExecFile(function(file, args, callback){
    call = { file: file, args: args };
    callback(null, plistFixture);
  });

  entitlements('-dangerous-option', function(error){
    assert.equal(error, null);
  });

  assert.deepEqual(call.args.slice(-2), ['--', '-dangerous-option']);
});

test('returns codesign errors unchanged', function(){
  var expectedError = new Error('codesign failed');
  var actualError;
  var entitlements = loadWithExecFile(function(file, args, callback){
    callback(expectedError);
  });

  entitlements('./Payload/Facebook.app', function(error){
    actualError = error;
  });

  assert.strictEqual(actualError, expectedError);
});

test('returns malformed plist errors through the callback', function(){
  var actualError;
  var entitlements = loadWithExecFile(function(file, args, callback){
    callback(null, 'not a plist');
  });

  assert.doesNotThrow(function(){
    entitlements('./Payload/Facebook.app', function(error){
      actualError = error;
    });
  });

  assert.ok(actualError instanceof Error);
});

test('rejects missing paths without invoking codesign', async function(){
  var called = false;
  var entitlements = loadWithExecFile(function(){
    called = true;
  });

  var error = await new Promise(function(resolve){
    entitlements(undefined, resolve);
  });

  assert.match(error.message, /path must be a non-empty string/);
  assert.equal(called, false);
});
