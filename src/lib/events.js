'use strict';

/**
 * Module dependencies.
 */

const EventEmitter = require('events').EventEmitter;
const _ = require('underscore');

/**
 * Initialize a new `Router` with the given `options`.
 *
 * @param {Object} options
 * @return {Events} which is a configurable function
 * @public
 */

const Events = {};

_.extend(Events, EventEmitter.prototype);

Events.mention = function mention(message) {
  const data = JSON.parse(message);
  const text = data.text;
  const mention = `<@${this.id}> `;
  if (text && text.startsWith(mention)){
    const command = text.substr(mention.length, text.length);
    const imageMe = 'image me ';
    const remindMe = 'remind me ';

    if (command.startsWith(imageMe)) {
      data.query = command.substr(imageMe.length, text.length);
      return this.postImage(data);
    } else if (command.startsWith(remindMe)) {
        data.query = command.substr(remindMe.length, text.length);
        return this.setReminder(data);
    } else {
      for (let event in this.events) {
        if (text.includes(event)) {
          const method = this.events[event];
          return this[method](data);
        }
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

Events.postImage = function postImage(params) {
  params.channel = params.channel;
  params.text = 'Gonna post soon, I swear.';
  return this.request('chat.postMessage', params);
};

Events.setReminder = function postImage(params) {
  params.channel = params.channel;
  params.text = 'Gonna set reminders soon, I swear.';
  return this.request('chat.postMessage', params);
};

module.exports = Events;