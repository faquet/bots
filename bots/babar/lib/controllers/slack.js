'use strict';
const request = require('request'),
      qs = require('querystring'),
      store = require('../store'),
      find = require('../utils').find;


let Slack = {

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
    params = {
      text: text,
      channel: id,
      username: store.name,
      token: store.token
    };

    return this.api('chat.postMessage', params);
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