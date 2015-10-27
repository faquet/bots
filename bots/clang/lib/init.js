'use strict';
const _ = require('underscore');
const api = require('./api');
const token = require('./credentials').token;
const attributes = require('../manifest.json');
const postMessage = require('./message').postMessage;
const Socket = require('ws');
const EventEmitter = require('events').EventEmitter;
const cron = require('./cron');

let team = {};

module.exports = () => {

  const Clang = {};
  Clang.token = token
  Clang.name = attributes.name;
  _.extend(Clang, EventEmitter);

  Clang.init = () => {
    let params = {token};
    api('rtm.start', params)
      .then((data) => {
        Clang.emit('start');
        connect(data.url);
        console.log('Clang is logged in.');
      });
  };

  Clang.captureData = (data) => {
    team.socketUrl = data.url;
    team.channels = data.channels;
    team.users = data.users;
    team.ims = data.ims;
    team.groups = data.groups;
    team.bots = data.bots;
    return team;
  };

  Clang.connect = (url) => {
    let socket = new Socket(url);

    socket.on('open', (data) => {
      Clang.emit('open', data);
    });

    socket.on('close', (data) => {
      Clang.emit('close', data);
    });

    socket.on('message', (data) => {
      try {
        Clang.emit('message', JSON.parse(data));
      } catch (e) {
        console.log(e);
      }
    });
  };

return Clang;
};