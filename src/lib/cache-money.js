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
const Socket = require('./socket');
// const BM = require('./bot_modules/index');



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
  const modules = {};
  const pub = {};

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

    mixin(this, EventEmitter.prototype, false);
    mixin(defaults, params);

    this.store = defaults;
    this.token = params.token;

    return new Promise((resolve, reject) => {
      return resolve(bot.connect());
    });

  };

/**
 * Start session.
 *   - establish connection with a chatroom
 *   - cache current team state
 * @private
 */

  bot.connect = function connect() {
    return this.req('rtm.start', this.store)

      .then((data) => {
        mixin(this, data, false);
        
    bot.moduleConfig();
    bot.loadModules();
    bot.userMethods();
        // return this;
      })

      .then((data) => {
        const wb = new WebSocket(this.url);
        const SocketServer = Socket(wb, this);
      })

      .then((data) => {
        this.connected();
        this.emit('start');
        return bot;
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
      // this.store.methods();

// modules.message.create('yoyo', 'yoyo', 'plickity-plow');
      
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
    const params =  mixin({
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
    const path = require("path").join(__dirname, "bot_modules");
    require("fs").readdirSync(path).forEach((file) => {
      let Module = require("./bot_modules/" + file);
      let module_name = file.slice(0, -3);
      if (bot.store.modules[module_name]) {
        modules[module_name] = Module;
      }
    });
  };

  /**
 * Load Bot Modules.
 *
 * @private
 */

 bot.loadModules = function() {
    for (let mod of Object.keys(modules)) {
      if (modules[mod]) {
        modules[mod].init(bot.store);
      }
    }
  };


  /**
 * Funnel Slack Messages Through Bot Modules.
 *
 * @private
 */

  bot.moduleFunnel = function(data) {
    for (let mod of Object.keys(modules)) {
      modules[mod].funnel(data, (message) => {
        console.log('message', message);
        return bot.postMessage(data.channel, message, bot.store);
      });
    };
  };

  bot.userMethods = function() {
    bot.createMessage = modules.message.create;
  };



  return bot.defaultConfiguration();

};