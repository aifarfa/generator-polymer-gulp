'use strict';

const appJson = require('../app.json');
const browserSync = require('browser-sync');
const gulp = require('gulp');
const watch = require('gulp-watch');
const run = require('run-sequence');

gulp.task('build', ['typescript'], (done) => {
  done();
});

gulp.task('test', ['test:service', 'test:wct'], (done) => {
  done();
});

gulp.task('watch', () => {
  browserSync.init({
    proxy: 'http://localhost:8080/components/' + appJson.name + '/',
    browser: ['google chrome'],
    reloadDelay: 2000
  });

  // HTML changed: HTML should be in the root folder or public folder only
  watch([
    './**/*.html',
    './public/scripts/**/*.js',
    './public/css/**/*.css'
  ], function (file) {
    run([], browserSync.reload);
  });

});
