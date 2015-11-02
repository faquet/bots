'use strict';

const Slack = require('../controllers/slack');

function Server(socket) {

  console.log('server');

  socket.on('start', () => {
    console.log('Babar can\'t feel his legs');
  });

  socket.on('message', (rawData) => {
    let data = JSON.parse(rawData);
    Slack.onMessage(data);
    console.log('message data: ', data);
  });

};

module.exports = Server;