'use strict';

/**
 * Module dependencies.
 * @private
 */

const Events = require('./events');
const WebSocket = require('ws');
const _ = require('underscore');
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

    mixin(this, params, false);
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
    this.start()
    .then((data) => {
      Object.defineProperties(this, {
        'id': {
          value: data.self.id,
          enumerable: true,
          writable: true,
          configurable: true
        },
        'url': {
          value: data.url,
          enumerable: true,
          writable: true,
          configurable: true
        },
        'team': {
          value: data.team,
          enumerable: true,
          writable: true,
          configurable: true
        }
      });
      return this;
    })
    .catch((err) => console.log(err))

    .then((data) => {
      const wb = new WebSocket(this.url);

      wb.on('open', (data) => this.emit('open', data));

      wb.on('close', (data) => this.emit('close', data));

      wb.on('message', (data) => {
        try {
          this.emit('message');
          this.mention(data);
        }
        catch (err) { console.log(err); }
      });
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
    const url = `https://slack.com/api/${method}?${qs.stringify(this.paramify(params))}`;

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

  /**
 * Put bot attributes in all request params.
 *
 * @param {Object} param
 * @private
 */

  paramify: function paramify(params) {
    params.token = this.token;
    params.name = this.name;
    params.icon_url = this.icon_url;
    params.username = this.username;
    return params;
  },
};