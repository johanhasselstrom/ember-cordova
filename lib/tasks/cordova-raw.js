'use strict';

var Task            = require('./-task');
var RSVP            = require('rsvp');
var Promise         = RSVP.Promise;
var cordovaPath     = require('../utils/cordova-path');
var cordovaLib      = require('cordova-lib');
var cordovaProj     = cordovaLib.cordova;
var events          = cordovaLib.events;
var cordovaLogger   = require('cordova-common').CordovaLogger.get();

module.exports = Task.extend({
  project: undefined,
  api: undefined,

  cordovaPromise:function(/* rawArgs */) {
    var args = Array.prototype.slice.call(arguments);
    var defer = new RSVP.defer();
    args.push(function() {
      return defer.resolve();
    });

    cordovaProj[this.api].apply(this, args);

    return defer.promise;
  },

  run: function() {
    var args = arguments;
    return new Promise(function(resolve, reject) {
      var emberPath = process.cwd();
      process.chdir(cordovaPath(this.project));

      cordovaLogger.subscribe(events);
      if (args[0] && args[0].verbose) { cordovaLogger.setLevel('verbose'); }

      return this.cordovaPromise.apply(this, args).then(function() {
        process.chdir(emberPath);
        resolve();
      }).catch(function(err) {
        reject(err);
      });
    }.bind(this));
  }
});
