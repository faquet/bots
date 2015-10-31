'use strict';
const util = require('util');
const extend = require('extend');
const EventEmitter = require('events').EventEmitter;
const Socket = require('ws');
const qs = require('querystring');
const request = require('request');

module.exports = class Bot {
  constructor(params) {
    this.token = params.token;
    this.name = params.name;
    util.inherits(Bot, EventEmitter);

    this.start();
    this.onStart();
  }
  start() {
    let params = {token: this.token};
    this.api('rtm.start', params)
      .then(data => {
        return this.cacheTeamData(data);
      })
      .then(data => {
        return this.connect(this.url);
      })
      .then(data => {
        return this.emit('start');
      });
  }
  cacheTeamData(data) {
    this.url = data.url;
    this.channels = data.channels;
    this.users = data.users;
    this.ims = data.ims;
    this.groups = data.groups;
    return this;
  }
  connect(url) {
    let socket = new Socket(url);

    socket.on('open', (data) => {
      this.emit('open', data);
    });

    socket.on('close', (data) => {
      this.emit('close', data);
    });

    socket.on('message', (data) => {
      try {
        this.emit('message', JSON.parse(data));
      } catch (err) {
        console.log(err);
      }
    });
  }
  onStart() {
    this.on('start', () => {
      console.log(`${this.name} is logged in.`);
    });
  }
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
      });
    });
  }
  postMessage(params) {
    this.api('chat.postMessage', params).then(data => {
      console.log(data);
    });
  }
  getGroup(name) {
      return this.getGroups().then(function(data) {
          return find(data.groups, { name: name });
      });
  }
  getGroups() {
    if (this.groups) {
      return Vow.fulfill({ groups: this.groups });
    }

    return this._api('groups.list');
  }
  getGroupId(name) {
    return this.getGroup(name).then(function(group) {
        return group.id;
    });
  }
  post(type, name, text, params, cb) {
    let method;

    switch (type) {
      case 'group':
        method = this.getGroupId;
        break;
      case 'channel':
        method = this.getChannelId;
        break;
      case 'user':
        method = this.getChatId;
        break;
    }

    if (typeof params === 'function') {
      cb = params;
      params = null;
    }

    return this[method](name).then(function(itemId) {
      return this.postMessage(itemId, text, params);
    }.bind(this)).always(function(data) {
        if (cb) {
            cb(data._value);
        }
    });
  }
};