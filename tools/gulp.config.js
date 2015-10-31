'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const $ = require('gulp-load-plugins')();

const paths = {
  eslint: {
    src: [
      'bots/**/*.js',
      'tools/**/*.js',
      'src/**/*.js',
      '!node_modules'
    ]
  }
};

const opts = {
  notify: {
    eslint: (file) => {
      if (file.eslint.errorCount === 0) {
        return false;
      }

      let errors = file.eslint.messages.map((data) => {
        return '(' + data.line + ':' + data.column + ') ' + data.message;
      }).join('\n');

      return file.relative + ' (' + file.eslint.errorCount + ' errors)\n' + errors;
    }
  },
  plumber: {
    errorHandler: function(err) {
      gutil.beep();
      console.log(err);
      $.notify(err);
      this.emit('end');
    }
  },
};

module.exports.paths = paths;
module.exports.opts = opts;