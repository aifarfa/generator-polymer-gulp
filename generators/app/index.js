'use strict';

const generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    // This makes `appname` a required argument.
    this.argument('appname', {
      type: String,
      required: true
    });
    // And you can then access it later on this way; e.g. CamelCased
    this.appname = _.camelCase(this.appname);
  },

  init: function() {
    this.log('initializing..');
  },

  prompting: function() {
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
    }], function(answers) {
      this.appname = answers.appname;
      done();
    }.bind(this));
  },

  writing: function() {
    this._copyEditorConfig();
    this._copyAppFiles();
    this._copyHtmlTemplate({
      title: this.appname
    });
    this._writeAppJson();
  },

  _copyEditorConfig: function() {
    this.log('writing editor config..');
    this.directory('config', './');
  },

  _copyAppFiles: function() {
    this.log('writing application files..');
    this.directory('public', 'public');
    this.directory('services', 'services');
    this.directory('test/service', 'test/service');
    this.directory('test/wct', 'test/wct');
  },

  _copyHtmlTemplate: function(context) {
    this.log('writing html template..');
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      context
    );
  },

  _writeAppJson: function() {
    this.log('writing app json');

    const context = {
        name: this.appname,
        authors: this.authors
      }
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
    )
  },

  install: {
    npm: function() {
      const dependencies = ['mocha', 'chai', 'sinon', 'polyserve'];
      this.log('installing node_modules..');
      this.npmInstall(dependencies, {
        saveDev: true
      });
    },
    bower: function() {
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
    finalize: function() {
      this.log('finally, done!');
    }
  }
});
