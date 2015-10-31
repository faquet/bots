'use strict';
const store = require('./lib/store');
const Bot = require('../../src/bot');

const clang = new Bot({
  token     : store.token,
  name      : store.name,
  username  : store.username,
  name      : store.name,
  icon_url  : store.icon_url,
  real_name : store.real_name
});

module.exports = clang;