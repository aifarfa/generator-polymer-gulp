'use strict';

const gulp = require('gulp');

gulp.task('build', ['typescript'], (done) => {
  done();
});

gulp.task('test', ['test:service', 'test:wct'], (done) => {
  done();
});
