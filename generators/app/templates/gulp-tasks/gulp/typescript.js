'use strict';

const gulp = require('gulp');
const gulpTs = require('gulp-typescript');

gulp.task('typescript', function () {
  var option = {
    'base': './'
  };
  var src = [
    './public/scripts/**/*.ts',
    './services/**/*.ts',
    './test/**/*.ts'
  ];
  return gulp.src(src, option)
    .pipe(gulpTs({
      module: 'commonjs',
      noImplicitAny: false,
      removeComments: false
    }))
    .pipe(gulp.dest('./'));
});
