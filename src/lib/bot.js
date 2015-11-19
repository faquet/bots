'use strict';

/**
 * Module dependencies.
 */

const proto = require('./proto');
const mixin = require('merge-descriptors');

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
  const bot = {};

  mixin(bot, proto, false);

  bot.init(params);
  return bot;
};