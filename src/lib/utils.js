'use strict';

exports.merge = function(a, b) {
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

exports.find = (arr, str) => {
  for (let item of arr ) {
    if (item.name === str) {
      return item;
    }
  }
};