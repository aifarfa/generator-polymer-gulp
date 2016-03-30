'use strict';

const generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = generator.Base.extend({

  constructor: function () {
    generator.Base.apply(this, arguments);
    // This makes `appname` a required argument.
    this.argument('appname', {
      type: String,
      required: true
    });
    // And you can then access it later on this way; e.g. CamelCased
    this.appname = _.camelCase(this.appname);
  },

  init: function () {
    this.log('initializing..');
  },

  prompting: function () {
    var done = this.async();
    this.prompt([{
      'type': 'input',
      'name': 'appname',
      'message': 'app name?',
      'default': this.appname
    }, {
      'type': 'input',
      'name': 'authors',
      'message': 'your team name?',
      'default': ''
    }], function (answers) {
      this.appname = answers.appname;
      this.authors = answers.authors;
      done();
    }.bind(this));
  },

  writing: function () {
    this._copyAppFiles();
    this._writeHtmlTemplate();
    this._writeAppJson();
  },

  _copyAppFiles: function () {
    this.directory('config', './'); // .editorconfig, .eslint and etc.
    this.directory('gulp-tasks', './'); // gulpfile
    this.directory('public', 'public');
    this.directory('services', 'services');
    this.directory('test', 'test');
  },

  _writeHtmlTemplate: function (context) {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'), {
        name: this.appname
      }
    );
  },

  _writeAppJson: function () {
    const context = {
      name: this.appname,
      authors: this.authors
    };
    // npm package.json, bower.json, app.json
    this.fs.copyTpl(this.templatePath('*.json'), './', context);
  },

  install: {
    npm: function () {
      this.log('installing dependencies..');
      this.npmInstall(this._dependencies(), {
        saveDev: true
      });
    },
    bower: function () {
      this.bowerInstall(['polymer'], {
        save: true
      });
      this.bowerInstall(['web-component-tester'], {
        saveDev: true
      });
    }
  },

  _dependencies: function () {
    return [
      'gulp',
      'gulp-mocha',
      'gulp-istanbul',
      'gulp-typescript',
      'gulp-watch',
      'istanbul',
      'run-sequence',
      'mocha',
      'chai',
      'sinon',
      'polyserve',
      'web-component-tester',
      'web-component-tester-istanbul',
      'browser-sync'
    ];
  },

  end: {
    finalize: function () {
      this.log('finally, done!');
    }
  }
});
