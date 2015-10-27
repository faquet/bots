'use strict';
const util = require('util');
const extend = require('extend');
const EventEmitter = require('events').EventEmitter;
const Socket = require('ws');
const api = require('./api');
const store = require('./store');

let team = {};

function Clang(params) {
  this.token = params.token;
  this.name = params.name;
  this.start = start;
  this.connect = connect;

  this.start();
};

util.inherits(Clang, EventEmitter);

const start = function() {
  let params = {token: this.token};
  api('rtm.start', params).then((data) => {
    this.emit('start');
    this.connect(data.url);
  });
};

const connect = function(url) {
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
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports = Clang;