
// 'use strict';

// const store = require('./config/store'),
//       Bot = require('./config/bot');


// Bot(store);


'use strict';

const Babar_Store = require('./config/store');
const Babar = require('../../src')(Babar_Store);

const Clang_Store = {
  token      : process.env.CLANG_KEY,
  name       : 'clang',
  username   : 'clang',
  real_name  : '__clang__',
  icon_url   : 'http://geekdad.com/images_blogs/photos/uncategorized/2007/06/08/cb2.jpg'
};
const Clang = require('../../src')(Clang_Store);

// console.log('BABAR', Babar);

Babar.createMessage('yoyo', 'plickity-plow');
Clang.createMessage('clang on', 'PEEEewwww do loo pew pew');


Babar.on('start', function() {
  Babar.emit('event', "holy bupkis");
});

Babar.on('message', function(data) {
  console.log('whoa dude data: ', data);
});

Clang.on('user_typing', function() {
  console.log('Stop that racket, Evan');
});

Babar.on('bot_mess', function(data) {
  setTimeout(function() {
    Babar.postMessage(data.channel, "I don't like your tone, " + data.username);
  }, 3000);
});

Clang.on('evan', function(data) {
  Clang.postMessage(data.channel, "Stop that racket, Evan");
});

// Babar.on('me', function(data) {
//   Babar.postMessage(data.channel, "What can I do ya for Anderson?");
// });


// Babar.createMessage('yoyo', 'plickity-plow');
// Babar.createMessage('funyuns', 'OH DOZ FUNYUNS');
// Babar.createMessage('who wants sum?', 'I do! I want some!');

// Clang.createMessage('facebook', 'face your book');
// Clang.createMessage('clang on', 'PEEEewwww do loo pew pew');


// Bot.then(function(babar){
//   console.log('babar', babar);
//   babar.createMessage('yoyo', 'yoyo', 'plickity-plow');
//   babar.createMessage('funyuns', 'funyuns', 'OH DOZ FUNYUNS');
// });

