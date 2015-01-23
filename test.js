'use strict';

var assert = require('assert');
var fs = require('fs');
var plistFixture = fs.readFileSync('./fixtures/fixture.plist', { encoding: 'UTF-8' });

var proxyquire =  require('proxyquire');
var childProcessStub = {
  exec: function(command, callback){
    callback(null, plistFixture);
  }
};

var entitlements = proxyquire('./', {'child_process': childProcessStub});

describe('should call exec correctly and parse plist output data', function(){
  it('return parsed data as object', function(done) {
    entitlements('./Payload/Facebook.app', function(error, data){
      assert.equal(error, null);
      assert.deepEqual(data, {"application-identifier":"com.facebook.facebook","get-task-allow":false});

      done();
    });
  });
});
