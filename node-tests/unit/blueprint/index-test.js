'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var Promise         = require('ember-cli/lib/ext/promise');
var CreateCordova   = require('../../../lib/tasks/create-cordova-project');
var GitIgnore       = require('../../../lib/tasks/update-gitignore');

describe('Blueprint Index', function() {
  var index;

  beforeEach(function() {
    index = require('../../../blueprints/ember-cordova/index');
    index.project = mockProject.project;
  });

  afterEach(function() {
    td.reset();
  });


  it('runs tasks in the correct order', function() {
    var tasks = [];

    td.replace(CreateCordova.prototype, 'run', function() {
      tasks.push('create-cordova-project');
      return Promise.resolve();
    });

    td.replace(GitIgnore.prototype, 'run', function() {
      tasks.push('update-gitignore');
      return Promise.resolve();
    });

    return index.afterInstall({}).then(function() {
      expect(tasks).to.deep.equal([
        'create-cordova-project',
        'update-gitignore'
      ]);
    });
  });

  it('passes template path', function() {
    td.replace(CreateCordova.prototype, 'run', function(path) {
      expect(path).to.equal('templatePath');
      return Promise.resolve();
    });
    index.afterInstall({templatePath: 'templatePath'});
  });
});
