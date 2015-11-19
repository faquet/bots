'use strict';

const parse = require('./utils').parse;

function SocketServer(socket, bot) {

  const BM = bot.store.modules;

  const Open = () => {
    console.log(`A motherfucka is connected . . . to ${bot.team.name}.\n
      ${bot.store.name} can\'t feel his legs`
    );
  };

  const Close = () => {
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

    for (let bot_module of Object.keys(BM)) {
      if (BM[bot_module]) {
        BM[bot_module](bot.store).init(dat, (message) => {
          console.log('message', message);
          return bot.postMessage(dat.channel, message, bot.store);
        });
      }
    };

  };

  socket.on('open', Open);

  socket.on('close', Close);

  socket.on('message', Message);

};

module.exports = SocketServer;