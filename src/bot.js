'use strict';
const util = require('util');
const extend = require('extend');
const EventEmitter = require('events').EventEmitter;
const Socket = require('ws');
const qs = require('querystring');
const request = require('request');
const helpers = require('./helpers');

const find = helpers.find;

module.exports = class Bot {
  constructor(params) {
    this.token = params.token;
    this.name = params.name;
    this.username = params.username;
    this.name = params.name;
    this.icon_url = params.icon_url;
    this.real_name = params.real_name;

    util.inherits(Bot, EventEmitter);
    this.start();
  }
  start() {
    let params = {token: this.token};
    this.api('rtm.start', params)
      .then(
        data => {
          return this.cacheTeamData(data);
      })
      .then(
        data => {
          return this.connect(this.url);
      })
      .then(
        data => {
          this.onStart();
          return this.emit('start');
      });
  }
  cacheTeamData(data) {
    this.team = data.team.name;
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
      console.log(`@${this.username} is logged in to ${this.team}`);
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
    this.api('chat.postMessage', params)
      .then(
        data => {
          console.log(data);
      });
  }
  getChannel(name) {
    return this.getChannels()
      .then(
        data => {
          return find(data.channels, name);
      });
  }
  getChannels() {
    if (this.channels) {
      return new Promise((resolve, reject) => {
        let channels = {channels: this.channels};
        return resolve(channels);
      });
    } else {
      this.api('channels.list')
        .then(
          data => {
            return data;
        });
    }
  }
  getChannelId(name) {
    this.getChannel(name)
      .then(
        channel => {
          return channel.id;
      });
  }
  post(name, text) {
    this.getChannel(name)
      .then(
        data => {
          return this.postMessage({
            channel   : data.id,
            text      : text,
            token     : this.token,
            username  : this.username,
            name      : this.name,
            icon_url  : this.icon_url,
            real_name : this.real_name
          });
        },
        err => {
          return console.log(err);
      });
  }
};