'use strict';

const util = require('util'),
      extend = require('extend'),
      EventEmitter = require('events').EventEmitter,
      Socket = require('ws'),
      SocketServer = require('./socket'),
      Slack = require('../controllers/slack');


function Bot(store) {

  this.token = store.bot_keys.token;
  this.name = store.bot_keys.name;

  this.start = function() {
    Slack.api('rtm.start', {token: this.token})
    .then((data) => {
      this.cacheTeamData(data);
      this.connect(data.url);
    });
  };

  this.cacheTeamData = function(data) {
    this.team = data.team.name;
    this.url = data.url;
    this.channels = data.channels;
    this.users = data.users;
    this.ims = data.ims;
    this.groups = data.groups;
    return this;
  };

  this.connect = function(url) {
    let socket = new Socket(url);
    Server = SocketServer(socket, this);
  };

  this.start();
};


function BotFactory(store) {
  new Bot(store);
}


module.exports = BotFactory;