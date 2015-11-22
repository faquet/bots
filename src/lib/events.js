'use strict';

/**
 * Module dependencies.
 */

const EventEmitter = require('events').EventEmitter;
const _ = require('underscore');
const Backbone = require('backbone');

/**
 * Initialize a new `Router` with the given `options`.
 *
 * @param {Object} options
 * @return {Events} which is a configurable function
 * @public
 */

const Events = {};

_.extend(Events, Backbone.Events);
_.extend(Events, EventEmitter.prototype);

Events.mention = function mention(data) {
  const parsed = JSON.parse(data);
  if (parsed.text && parsed.text.includes(`<@${this.id}>`)){
    for (let event in this.events) {
      if (parsed.text.includes(event)) {
        const method = this.events[event];
        this[method](parsed);
      }
    }
  }
};

Events.start = function start() {
  this.on('start', () => {
    console.log(`[bot] - @${this.name} connected to ${this.team.name}`);
  });

  return this.request('rtm.start', this);
};

Events.postMessage = function postMessage(params) {
  return this.request('chat.postMessage', params);
};

module.exports = Events;