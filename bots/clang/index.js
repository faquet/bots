'use strict';
module.exports.api = require('./lib/api');
module.exports.token = require('./lib/credentials').token;
module.exports.attributes = require('./lib/credentials').attributes;
module.exports.postMessage = require('./lib/message').postMessage;
module.exports.init = require('./lib/init');