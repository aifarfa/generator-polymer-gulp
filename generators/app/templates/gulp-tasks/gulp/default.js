'use strict';

const gulp = require('gulp');

gulp.task('test', ['test:service', 'test:wct'], (done) => {
  done();
});
