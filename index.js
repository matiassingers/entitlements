'use strict';

var execFile = require('child_process').execFile;
var plist = require('simple-plist');

module.exports = function(path, callback){
  if(typeof callback !== 'function'){
    throw new TypeError('callback must be a function');
  }

  if(typeof path !== 'string' || path.length === 0){
    return process.nextTick(function(){
      callback(new TypeError('path must be a non-empty string'));
    });
  }

  var args = ['-d', '--entitlements', '-', '--xml', '--', path];

  execFile('codesign', args, function(error, output){
    if(error){
      return callback(error);
    }

    var data;

    try {
      data = plist.parse(output);
    } catch(parseError){
      return callback(parseError);
    }

    callback(null, data);
  });
};
