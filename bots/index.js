'use strict';
const Bot = require('../src');

module.exports = () => {

  const clang = Bot(require('./clang'));
  const babar = Bot(require('./babar'));

};
