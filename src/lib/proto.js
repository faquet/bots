'use strict';

/**
 * Module dependencies.
 * @private
 */

const Events = require('./events');
const WebSocket = require('ws');
const mixin = require('merge-descriptors');
const r = require('request');
const qs = require('querystring');
const ws = require('ws');

/**
 * Bot prototype.
 * @private
 */

const Bot = exports = module.exports = {

/**
 * Initialize bot.
 *
 * @param {String} token
 * @private
 */

  init: function init(params) {
    if (!params.token) {
      throw new Error('No token was provided');
    }

    for (let fn in params.methods) {
      this[fn] = params.methods[fn];
    }
    this.triggers = params.triggers;
    this.token = params.token;
    this.icon_url = params.icon_url || 'https://avatars0.githubusercontent.com/u/12116474?v=3&amp;s=200';
    mixin(this, Events, false);
    this.connect();
  },

/**
 * Start session.
 *   - establish connection
 *
 * @private
 */

  connect: function connect() {
    this.request('rtm.start', this)

    .then((data) => {
      mixin(this, data.self, false);
      mixin(this, data.team, false);
      mixin(this, data, false);
      return this;
    })
    .catch((err) => console.log(err))

    .then((data) => {
      const wb = new WebSocket(this.url);

      wb.on('open', (data) => this.emit('open', data));

      wb.on('close', (data) => this.emit('close', data));

      wb.on('message', (data) => {
        try { this.emit('message', this.req(data)); }
        catch (err) { console.log(err); }
      });

      this.on('start', () => console.log(`${this.name} connected to ${this.team.name}`));
    })

    .then((data) => { return this.emit('start'); })

    .catch((err) => console.log(err));
  },

/**
 * Request to Slack web API.
 *   - send request to Slack API
 *
 * @param {String} method
 * @param {String} token
 * @private
 */

  request: function request(method, params) {
    const url = `https://slack.com/api/${method}?${qs.stringify(params)}`;

    return new Promise((resolve, reject) => {
      r(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(JSON.parse(body));
        } else if (error || response.statusCode !== 200) {
          throw new Error(`${response.statusCode}: ${error}`);
        }
      });
    });
  },
  handleResponse: function handleResponse(data) {
    for (let t in this.triggers) {
      if (data.text.includes(t)) {
        this[t]();
      }
    }
  },
};