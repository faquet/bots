'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const $ = require('gulp-load-plugins')();
const paths = require('./tools/gulp.config').paths;
const opts = require('./tools/gulp.config').opts;
const shell = require('gulp-shell');

gulp.task('default', ['eslint:watch']);

gulp.task('watch', ['nodemon', 'eslint:watch']);

gulp.task('nodemon', shell.task('nodemon server.js'));

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