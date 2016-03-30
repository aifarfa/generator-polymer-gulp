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
        title: this.appname
      }
    );
  },

  _writeAppJson: function () {
    const context = {
      name: this.appname,
      authors: this.authors
    };
    // npm package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      context
    );
    // bower.json
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      context
    );
  },

  install: {
    npm: function () {
      this.log('installing node_modules..');
      this.npmInstall([
        'gulp',
        'gulp-mocha',
        'mocha',
        'chai',
        'sinon',
        'gulp-istanbul',
        'web-component-tester',
        'web-component-tester-istanbul',
        'istanbul',
        'polyserve'
      ], {
        saveDev: true
      });
    },
    bower: function () {
      this.log('installing bower_components..');
      this.bowerInstall(['polymer'], {
        save: true
      });
      this.bowerInstall(['web-component-tester'], {
        saveDev: true
      });
    }
  },

  end: {
    finalize: function () {
      this.log('finally, done!');
    }
  }
});
