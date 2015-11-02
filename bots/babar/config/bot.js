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
      this.cacheTeamData(data);
      this.connect(data.url);
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
    console.log('connect');
    let socket = new Socket(url);
    Server = SocketServer(socket);
  }
};