'use strict';
let gulp = require('gulp');
let gutil = require('gulp-util');
let $ = require('gulp-load-plugins')();
let paths = require('./tools/gulp.config').paths;
let opts = require('./tools/gulp.config').opts;

gulp.task('default', ['eslint:watch']);

gulp.task('eslint:watch', () => {
  gulp.watch(paths.eslint.src, ['eslint']);
});

gulp.task('eslint', () => {
  return gulp.src(paths.eslint.src)
    .pipe($.plumber(opts.plumber))
    .pipe($.eslint())
    .on('error', opts.plumber.errorHandler)
    .pipe($.eslint.format('stylish'))
    .pipe($.notify(opts.notify.eslint));
});