'use strict'

/**
 * Module dependencies.
 */

;
var proto = require('./proto');
var mixin = require('merge-descriptors');

/**
 * Expose `createBot()`.
 */

exports = module.exports = createBot;

/**
 * Create a bot instance.
 *
 * @return {Function}
 * @api public
 */

function createBot(params) {
  var bot = {};

  mixin(bot, proto, false);

  bot.init(params);
  return bot;
};