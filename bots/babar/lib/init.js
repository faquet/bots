'use strict';
const util = require('util'),
      extend = require('extend'),
      EventEmitter = require('events').EventEmitter,
      Socket = require('ws'),
      Slack = require('./controllers/slack');

function Bot(params) {
  this.token = params.token;
  this.name = params.name;
  this.start = start;
  this.connect = connect;

  this.start();
};

util.inherits(Bot, EventEmitter);

const start = function() {
  let params = {token: this.token};
  Slack.api('rtm.start', params).then((data) => {
    Slack.wsUrl = data.url;
    Slack.channels = data.channels;
    Slack.users = data.users;
    Slack.ims = data.ims;
    Slack.groups = data.groups;

    this.emit('start');
    this.connect(data.url);
  });
};

const connect = function(wsUrl) {
  let socket = new Socket(wsUrl);

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
};


module.exports = Bot;