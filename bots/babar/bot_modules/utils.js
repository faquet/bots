'use strict';
const path = require('path');

module.exports.random = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

module.exports.capitalize = (wordList) => {
  let tmpList = Object.keys(wordList).filter((word) => {
    return word[0] >= 'A' && word[0] <= 'Z';
  });
  return tmpList[~~(Math.random() * tmpList.length)];
};

module.exports.ofType = (file) => {
  return file.indexOf('.' + path.sep) === 0 || file.indexOf(path.sep) === 0;
};

module.exports.select = (obj) => {
  let keys = Object.keys(obj);
  let sum = keys.reduce((p, c) => p + obj[c], 0);

  if (!Number.isFinite(sum)) {
    throw new Error('All values in object must be a numeric value');
  }

  let select = ~~(Math.random() * sum);

  for (let i = 0, count = 0; i < keys.length; i++) {
    count += obj[keys[i]];
    if (count > select) {
      return keys[i];
    }
  }
};