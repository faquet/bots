'use strict';
const util = require('util');
const extend = require('extend');
const EventEmitter = require('events').EventEmitter;
const Socket = require('ws');
const qs = require('querystring');
const request = require('request');
const postMessage = require('./message');

const Bot = class Bot {
  constructor(params) {
    this.token = params.token;
    this.name = params.name;
    util.inherits(Bot, EventEmitter);

    this.start();
    this.onStart();
  }
  start() {
    let params = {token: this.token};

    this.api('rtm.start', params).then((data) => {
      this.connect(data.url);
      this.emit('start');
    });
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
  onStart() {
    this.on('start', () => {
      console.log(`${this.name} is logged in.`);
    });
  }
};

module.exports = Bot;