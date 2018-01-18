'use strict';

var Task            = require('./-task');
var cordovaPath     = require('../utils/cordova-path');
var fsUtils         = require('../utils/fs-utils');
var logger          = require('../utils/logger');
var camelize        = require('../../lib/utils/string.js').camelize;

var path            = require('path');
var Promise         = require('rsvp');

var cordovaProj     = require('cordova-lib').cordova;

module.exports = Task.extend({
  id: undefined,
  name: undefined,
  project: undefined,

  run: function(templatePath) {
    var emberCdvPath = cordovaPath(this.project, true);
    var cdvPath = path.join(emberCdvPath, 'cordova');

    if (!fsUtils.existsSync(emberCdvPath)) {
      fsUtils.mkdir(emberCdvPath);
    }

    if (!fsUtils.existsSync(cdvPath)) {
      logger.info('Initting ember-cordova directory');

      var id = camelize(this.id);
      var name = camelize(this.name);

      var config = {
        lib: {
          www: { url: 'ember-cordova-template', template: true }
        }
      };

      if (templatePath !== undefined) {
        config.lib.www.url = templatePath;
      }

      return cordovaProj.create(cdvPath, id, name, config);
    } else {
      logger.warn('Cordova dir already exists, please ensure it is valid');
      return Promise.resolve();
    }
  }
});
