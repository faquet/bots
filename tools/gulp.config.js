'use strict';
let gulp = require('gulp');
let gutil = require('gulp-util');
let $ = require('gulp-load-plugins')();

let paths = {
  eslint: {
    src: [
      '*.js',
      '!node_modules'
    ]
  }
};

let opts = {
  notify: {
    eslint: function(file) {
      if (file.eslint.errorCount === 0) {
        return false;
      }
      let errors = file.eslint.messages.map(function(data) {
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