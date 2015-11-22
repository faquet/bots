'use strict';

const parse = require('./utils').parse;

function SocketServer(socket, bot) {

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

    bot.emit('message', dat);

    if ( 
      dat.username === bot.store.name || 
      dat.message ||
      dat.type !== "message"
      ){
        return;
      }

    if (dat.subtype === 'bot_message') {
      bot.emit('bot_mess', dat);
    }

    if (dat.user === 'U0D1VC894') {
      bot.emit('evan', dat);
    }

    if (dat.user === 'U0D1VGD0W') {
      bot.emit('me', dat);
    }
    

    console.log('message data:', data);

    bot.moduleFunnel(dat);

  };

  const UserTyping = (data) => {
    const dat = JSON.parse(data);
    console.log('dudududud');
    // bot.emit('user_typing', dat);
  };

  socket.on('open', Open);

  socket.on('close', Close);

  socket.on('message', Message);

  socket.on('user_typing', UserTyping);

};

module.exports = SocketServer;