'use strict';

const Slack = require('../controllers/slack');

function Server(socket, bot) {

  socket.on('open', () => {
    console.log(`A motherfucka is connected . . . to ${bot.team}.\n${bot.name} can\'t feel his legs`);
  });

  socket.on('close', () => {
    console.log('he gone.');
  });

  socket.on('message', (data) => {
    Slack.onMessage(JSON.parse(data));
  });

};

module.exports = Server;