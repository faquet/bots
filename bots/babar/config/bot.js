'use strict';

const util = require('util'),
      extend = require('extend'),
      EventEmitter = require('events').EventEmitter,
      Socket = require('ws'),
      SocketServer = require('./socket'),
      Slack = require('../controllers/slack');



module.exports = class Bot {
  constructor(store) {
    this.token = store.bot_keys.token;
    this.name = store.bot_keys.name;

    util.inherits(Bot, EventEmitter);
    this.start();
  }

  start() {
    let params = {token: this.token};
    console.log('huh', params);
    Slack.api('rtm.start', params)
    .then((data) => {

      console.log('startData', data);
      Slack.wsUrl = data.url;
      Slack.channels = data.channels;
      Slack.users = data.users;
      Slack.ims = data.ims;
      Slack.groups = data.groups;


      console.log('dataurl', data.url);
      this.connect(data.url);
    });
  }

  connect(wsUrl) {
    console.log('connect');
    let socket = new Socket(wsUrl);
    Server = SocketServer(socket);
  }
};