'use strict';

const WebSocket = require('ws');

function SocketServer(bot) {

  const socket = new WebSocket(bot.url);

  const BM = bot.store.modules;

  const Open = () => {
    bot.emit('open');
    console.log(`A motherfucka is connected . . . to ${bot.team.name}.\n
      ${bot.store.name} can\'t feel his legs`
    );
  };

  const Close = () => {
    bot.emit('close');
    console.log('he gone.');
  };

  const Message = (data) => {
    const dat = JSON.parse(data);
    if ( 
      dat.username === bot.store.name || 
      dat.message ||
      dat.type !== "message"
      ){
        return;
      }
    console.log('message data:', dat);
    bot.emit('message', dat);
    bot.moduleFunnel(dat);
  };

  const UserTyping = (data) => {
    const dat = JSON.parse(data);
    console.log('dudududud');
    bot.emit('user_typing', dat);
  };

  socket.on('open', Open);

  socket.on('close', Close);

  socket.on('message', Message);

  socket.on('user_typing', UserTyping);

};

module.exports = SocketServer;