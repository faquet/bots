'use strict';
const store = require('./lib/store');
const api = require('./lib/api');
const postMessage = require('./lib/message');
const Clang = require('./lib/init');

const clang = new Clang({
  token: store.token,
  name: store.name
});

clang.on('start', () => {
  console.log('Clang is logged in.');
});