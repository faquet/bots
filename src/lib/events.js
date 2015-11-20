'use strict';

/**
 * Module dependencies.
 */

const EventEmitter = require('events').EventEmitter;
const mixin = require('merge-descriptors');

/**
 * Initialize a new `Router` with the given `options`.
 *
 * @param {Object} options
 * @return {Events} which is a configurable function
 * @public
 */

const Events = {};

mixin(Events, EventEmitter.prototype, false);

Events.req = function req(data) {
  const parsed = JSON.parse(data);
  if (parsed.text){
    if (parsed.text.includes(`<@${this.id}>`)) {
      this.handleResponse(parsed);
    }
  }
};

Events.start = function() {
  this.on('start', () => {
    console.log(`[bot] - @${this.name} connected to ${this.team.name}`)
  });

  return this.request('rtm.start', this);
};

module.exports = Events;