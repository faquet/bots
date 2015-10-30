'use strict';
const store = require('./lib/store');
const Bot = require('../../src/bot');

module.exports = new Bot({
    token: store.token,
    name: store.name
});