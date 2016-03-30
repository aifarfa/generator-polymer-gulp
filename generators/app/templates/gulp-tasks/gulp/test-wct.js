'use strict';

const gulp = require('gulp');
// const util = require('gulp-util');
const wct = require('web-component-tester');

gulp.task('test:wct', [], function (done) {
  /**
   * see: https://github.com/Polymer/web-component-tester/blob/master/runner/config.js
   * @type {Object}
   */
  const config = {
    expanded: false,
    testTimeout: 300000, // 5 minutes
    persistent: false, // keep open
    plugins: {
      local: {
        browsers: ['chrome']
      },
      sauce: false,
      istanbul: {
        dir: './coverage/wct',
        reporters: ['text-summary', 'lcov', 'cobertura'],
        include: [
          '**/public/scripts/components/**/*.html'
        ],
        exclude: [
          '**/bower_components/**/*.html'
        ]
      }
    },
    skipUpdateCheck: true,
    suites: ['test/wct/'],
    verbose: false
  };

  wct.test(config, function (error) {
    if (error) {
      // util.log(error);
    }
    done(error);
  });
});
