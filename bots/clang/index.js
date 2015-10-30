'use strict';
const store = require('./lib/store');
const Bot = require('./lib/init');

module.exports = new Bot({
    token: store.token,
    name: store.name
});