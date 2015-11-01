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
        return;
      }

      let errors = file.eslint.messages.map((data) => {
        let location = `Line: ${data.line}:${data.column} |\n${data.message}`;
        return location;
      });

      let message = `File: ${file.relative} (${file.eslint.errorCount} errors)\n${errors}\n`;
      return message;
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