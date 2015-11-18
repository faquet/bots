'use strict';

const parse = require('./utils').parse;
const ImageMe = require('./bot_modules/image-me');

function SocketServer(socket, bot) {

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
    console.log('dat.message: ', dat.message);
    if ( 
         dat.username === bot.store.name || 
         dat.message ||
         dat.type !== "message"
       ) 
       {
         return;
       }

    if (bot.store.image_me) {
      bot.ImageMe(bot.store.google_keys).search(dat, (link) => {
         bot.postMessage(dat.channel, link, bot.store);
      });
    }

    if (bot.store.remind_me) {
      bot.RemindMe().create(dat, (reminder) => {
         bot.postMessage(dat.channel, reminder, bot.store);
      });
    }

    if (bot.store.message_me) {
      bot.MessageMe().findResponse(dat, (message) => {
         bot.postMessage(dat.channel, message, bot.store);
      });
    }

  });

};

module.exports = SocketServer;