'use strict';
const store = require('./lib/store');
const api = require('./lib/api');
const Clang = require('./lib/init');
const cron = require('./lib/cron');

module.exports = () => {
  const clang = new Clang({
    token: store.token,
    name: store.name
  });

  clang.on('start', () => {
    console.log('Clang is logged in.');
    cron(clang);
  });
}();