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

    this.messageMe(data);
    this.imageMe(data);
    this.remindMe(data);
  },



  messageMe(data) {
    if (data.type === 'message') {
      MessageMe.findResponse(data.text, (message) => {
        this.postMessage(data.channel, message, store.bot_keys);
      });
    }
  },

  remindMe(data) {
    if (data.type === 'message' && parse(data.text, 'remind me')) {
      let reminderData = data.text.match(/(\d+)\s(\w+)(?:\sto\s|\s)"([^"]*)"/i);
      RemindMe.create(reminderData, (reminder) => {
        this.postMessage(data.channel, reminder, store.bot_keys);
      });
    }
  },

  imageMe(data) {
    if (data.type === 'message' && parse(data.text, 'image me')) {
      let searchCriteria = data.text.match(/(image me)? (.*)/i).pop();
      ImageMe.search(searchCriteria, (link) => {
        this.postMessage(data.channel, link, store.bot_keys);
      });
    }
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