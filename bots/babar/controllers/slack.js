'use strict';

const request = require('request'),
      _ = require('underscore'),
      qs = require('querystring'),
      store = require('../config/store'),
      ImageMe = require('../bot_modules/image-me'),
      RemindMe = require('../bot_modules/remind-me'),
      MessageMe = require('../bot_modules/message-me'),
      parse = require('../config/utils').parse;


const Slack = {

  onMessage(data) {
    if (data.username === store.bot_keys.name || data.message) {return;}

    MessageMe.findResponse(data, (message) => {
      this.postMessage(data.channel, message, store.bot_keys);
    });

    ImageMe.search(data, (link) => {
      this.postMessage(data.channel, link, store.bot_keys);
    });

    RemindMe.create(data, (reminder) => {
      this.postMessage(data.channel, reminder, store.bot_keys);
    });
  },




  postMessage(id, text, bot_keys) {
    let params = _.extend({
      text: text,
      channel: id,
    }, bot_keys);

    return this.api('chat.postMessage', params);
  },

  api(method, params) {
    let query = qs.stringify(params);
    let path = `${method}?${query}`;
    let url = `https://slack.com/api/${path}`;

    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body);
          resolve(data);
        }
        if (error || response.statusCode !== 200) {
          console.log('response: ', response.statusCode);
          return console.log('error: ', error);
        }
      });
    });
  }

};



module.exports = Slack;