'use strict';
const _ = require('underscore');

module.exports.find = (array, string) => {
  for (let item of array ) {
    if (item.name ===  string) {
      console.log(item);
      return item;
    }
  }
};