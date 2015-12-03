/*!
 * Wo lo looooooo
 * Copyright(c) 2015 ßvæn "Quail Man" Yµrnær
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const EventEmitter = require('events').EventEmitter;
const request = require('request');
const qs = require('querystring');
const Socket = require('./socket');
const _ = require('underscore');



exports = module.exports = Bot;

/**
 * Bot factory.
 *
 * @param {object} token
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

  const bot = {
    modules: {},
  };

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
      real_name: '',
      modules: {
        message: true,
        remind: true,
      }
    };

    _.extend(this, EventEmitter.prototype);
    _.extend(defaults, params);

    this.store = defaults;
    this.token = params.token;

    bot.moduleConfig();
    bot.loadPublicUserMethods();

    bot.connect();

    return bot;

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
        _.extend(this, data);
      })

      .then((data) => {
        const SocketServer = Socket(this);
      })

      .catch((err) => console.log(err));
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
        if (error || response.statusCode !== 200) {
          console.log('response: ', response.statusCode);
          return console.log('error: ', error);
        }
      });
    });
  };


/**
 * Post message to Slack API.
 *
 * @private
 */

  bot.postMessage = function(id, text) {
    const params =  _.extend({
      text: text,
      channel: id,
    }, this.store);

    return this.req('chat.postMessage', params);
  };


  /**
 * Bot config.
 *
 * @private
 */

 bot.moduleConfig = function() {
  const path = require("path").resolve("src/bot_modules");
    require("fs").readdirSync(path).forEach((file) => {
      let Module = require(path + "/" + file);
      let module_name = file.slice(0, -3);
      if (bot.store.modules[module_name]) {
        let mod = Module.init(bot.store);
        this.modules[module_name] = { cache: {}};
        _.extend(this.modules[module_name], mod);
      }
    });
  };


  /**
 * Funnel Slack Messages Through Bot Modules.
 *
 * @private
 */

  bot.moduleFunnel = function(data) {
    for (let mod of Object.keys(bot.modules)) {
      console.log(bot.modules[mod]);
      bot.modules[mod].funnel(data, (message) => {
        return bot.postMessage(data.channel, message, bot.store);
      });
    };
  };


  /**
 * Initiate Public User Methods.
 *
 * @private
 */

  bot.loadPublicUserMethods = function() {
    bot.createMessage = function(watch_text, bot_response) {
      return this.modules.message.create(watch_text, bot_response);
    };
  };



  return bot.defaultConfiguration();

};