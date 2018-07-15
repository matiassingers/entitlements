'use strict';

var exec = require('child_process').exec;
var plist = require('simple-plist');
var shellescape = require('shell-escape');

module.exports = function(path, callback){
  var args = ['codesign', '-d', '--entitlements :-', path];

  exec(shellescape(args), function(error, output){
    if(error){
      return callback(error);
    }

    callback(null, plist.parse(output));
  });
};
