'use strict';

const parse = require('./utils').parse;

function SocketServer(socket, bot) {

  const BM = bot.store.modules;

  socket.on('open', () => {
    console.log(`A motherfucka is connected . . . to ${bot.team.name}.\n
      ${bot.store.name} can\'t feel his legs`
    );
  });

  socket.on('close', () => {
    console.log('he gone.');
  });

  socket.on('message', (data) => {
    let dat = JSON.parse(data);

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

});

};

module.exports = SocketServer;