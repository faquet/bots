/*!
 * cache-money
 * Copyright(c) 2015 Evan "Chef Boyardeez Nuts" Turner
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const EventEmitter = require('events').EventEmitter;
const WebSocket = require('ws');
const mixin = require('merge-descriptors');
const request = require('request');
const qs = require('querystring');

exports = module.exports = Bot;

/**
 * Bot factory.
 *
 * @param {String} token
 * @return {bot}
 * @public
 */

function Bot(params) {
  if (!params.token) {
    throw new Error('No token was provided');
  }

/**
 * Bot prototype.
 */

  const bot = {};

/**
 * Initialize bot configuration.
 *   - setup default configuration
 *   - setup private methods
 * @private
 */

  bot.defaultConfiguration = function defaultConfiguration() {
    this.store = {};
    const defaults = {
      username: 'Vesclovious',
      icon_url: 'https://avatars0.githubusercontent.com/u/12116474?v=3&amp;s=200',
      real_name: ''
    };

    mixin(this, EventEmitter.prototype, false);
    mixin(defaults, params);

    this.store = defaults;
    this.token = params.token;
    this.connect();
  };

/**
 * Start session.
 *   - establish connection with a chatroom
 *   - cache current team state
 * @private
 */

  bot.connect = function connect() {
    this.req('rtm.start', this.store)

      .then((data) => {
        mixin(this, data, false);
        return this;
      })

      .then((data) => {
        const wb = new WebSocket(this.url);
        wb.on('open', (data) => this.emit('open', data));
        wb.on('close', (data) => this.emit('close', data));
        wb.on('message', (data) => {
          try { this.emit('message', JSON.parse(data)); }
          catch (err) { console.log(err); }
        });
      })

      .then((data) => {
        this.connected();
        return this.emit('start');
      })
      .catch((err) => console.log(err));
  };

/**
 * Callback when connection is established.
 *
 * @public
 */

  bot.connected = function connected() {
    this.on('start', () => {
      console.log(`@${this.store.username} is logged in to ${this.team.name}`);
    });
    return this;
  };

/**
 * Request to web API.
 *   - establish connection with a chatroom
 *   - cache current team state
 * @private
 */

  bot.req = function req(method, params) {
    const query = qs.stringify(params);
    const path = `${method}?${query}`;
    const url = `https://slack.com/api/${path}`;

    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const data = JSON.parse(body);
          resolve(data);
        }
      });
    });
  };

  bot.defaultConfiguration();

  return bot;
};