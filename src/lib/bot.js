'use strict';

/**
 * Module dependencies.
 */

const proto = require('./proto');
const mixin = require('merge-descriptors');

/**
 * Expose `createApplication()`.
 */

exports = module.exports = Bot;

/**
 * Create an bot.
 *
 * @return {Function}
 * @api public
 */

function Bot(params) {
  const bot = {};

  mixin(bot, proto, false);

  bot.init(params);
  return bot;
};