'use strict';
const request = require('request'),
      _ = require('underscore'),
      qs = require('querystring'),
      store = require('../config/store'),
      ImageMe = require('../bot_modules/image-me'),
      RemindMe = require('../bot_modules/remind-me'),
      MessageMe = require('../bot_modules/message-me'),
      find = require('../config/utils').find,
      parse = require('../config/utils').parse;


let Slack = {



  onMessage: function(data) {
    if (data.username === 'babar') {return;}

    this.messageMe(data);
    this.imageMe(data);
    this.remindMe(data);
  },



/// weird, .bind(this) does not work with => functions
  messageMe: function(data) {
    if (data.type === 'message') {
      MessageMe.findResponse(data.text, function(message) {
        this.postMessage(data.channel, message, store.post_params);
      }.bind(this));
    }
  },

  remindMe: function(data) {
    if (data.type === 'message' && parse(data.text, 'remind me')) {
      let reminderData = data.text.match(/(\d+)\s(\w+)(?:\sto\s|\s)"([^"]*)"/i);
      RemindMe.create(reminderData, function(reminder) {
        this.postMessage(data.channel, reminder, store.post_params);
      }.bind(this));
    }
  },

  imageMe: function(data) {
    if (data.type === 'message' && parse(data.text, 'image me')) {
      let searchCriteria = data.text.match(/(image me)? (.*)/i).pop();
      ImageMe.search(searchCriteria, function(link) {
        this.postMessage(data.channel, link, store.post_params);
      }.bind(this));
    }
  },




















  getChannels: function() {
    if (this.channels) {
      return Promise.resolve({ channels: this.channels});
    }
    return this.api('channels.list', { token: store.token });
  },

  getChannelId: function(name) {
    return this.getChannels().then(function(data) {
       return find(data.channels, { name: name });
    });
  },

  post: function(type, name, text, params, cb) {
    var method = ({
        'channel': 'getChannelId',
    })[type];

    if (typeof params === 'function') {
        cb = params;
        params = null;
    }

    return this[method](name).then(function(channel) {
        return this.postMessage(channel.id, text, params);
    }.bind(this)).then(function(data) {
        if (cb) {
            cb(data._value);
        }
    });
  },

  postMessage: function(id, text, params) {
    let requiredParams = {
      text: text,
      channel: id,
      username: store.name,
      token: store.token
    };

    let extendedParams = _.extend(params, requiredParams);

    return this.api('chat.postMessage', extendedParams);
  },

  postMessageToChannel: function(name, text, params, cb) {
    this.post('channel', name, text, params, cb);
  },

  api: function(method, params) {
    let query = qs.stringify(params);
    let path = `${method}?${query}`;
    let url = `https://slack.com/api/${path}`;

    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body);
          resolve(data);
        }
      });
    });
  }

};



module.exports = Slack;