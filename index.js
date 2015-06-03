'use strict';

var plist = require('simple-plist');
var os = require('os').platform();

module.exports = function(path, callback){
  if(os === 'darwin') {
    var exec = require('child_process').exec;
    exec('codesign -d --entitlements :- ' + path, function(error, output){
      if(error){
        return callback(error);
      }
      console.log(output);
      callback(null, plist.parse(output));
    });
  } else {
    console.log('nothing');
    callback(null, {});
  }
};
