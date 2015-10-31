'use strict';
const store = require('./lib/store');
const Bot = require('../../src/bot');

const clang = new Bot({
  token: store.token,
  name: store.name
});

clang.on('start', () => {
  clang.getChannel('repo');
});

module.exports = clang;