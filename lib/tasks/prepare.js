'use strict';

var Task            = require('./-task');
var CordovaRawTask  = require('../tasks/cordova-raw');
var logger          = require('../utils/logger');

module.exports = Task.extend({
  project: undefined,
  verbose: false,

  run: function() {
    logger.info('Running cordova prepare');
    var prepare = new CordovaRawTask({
      project: this.project,
      api: 'prepare',
    });

    return prepare.run({ verbose: this.verbose });
  }
});
