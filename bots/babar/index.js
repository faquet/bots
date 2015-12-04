'use strict';

const Babar_Store = require('./config/babar_store');
const Babar = require('../../src').hold(Babar_Store);

const Pancakes_Store = require('./config/pancakes_store');
const Pancakes = require('../../src').hold(Pancakes_Store);

console.log(Babar);

Babar.createMessage('yoyo', 'plickity-plow');
Pancakes.createMessage('pancakes ready', 'oh boy oh boy oh boy');


Babar

.on('start', () => {
  Babar.emit('event', "holy bupkis");
})
.on('bot_mess', (data) => {
  setTimeout(() => {
    Babar.postMessage(data.channel, "I don't like your tone, " + data.username);
  }, 3000);
})
.on('message', (data) => {

    if (data.subtype === 'bot_message') {
      Babar.emit('bot_mess', data);
    }

    // if (data.user === 'U0D1VC894') {
    //   Clang.emit('annoy evan', data);
    // }

    if (data.user === 'U0D1VGD0W' && 10 === Math.floor((Math.random() * 10) + 1)) {
      Babar.emit('me', data);
    }

    console.log('whoa dude data: ', data);
})
.on('me', (data) => {
  const compliments = [
    `You're the bees vagina, ${data.user}`,
    `You quack like a duck better than anyone I know, ${data.user}`,
    `You make Steve Harvey look like Steve Harvey, ${data.user}`,
    `Can't image what life on this planet would be without you, ${data.user}.
    A cold desert wasteland, remote, desolate, barren . . . just like you
    deep down! Isn't that neat!`,
    `We should really get some fish in chups, ${data.user}.`
  ];
  Babar.postMessage(
    data.channel,
    compliments[Math.floor((Math.random() * complements.length) - 1)]
  );
});




// Clang

// .on('user_typing', () => {
//   console.log('Stop that racket, Evan');
// })
// .on('annoy evan', (data) => {
//   Clang.postMessage(data.channel, "Stop that racket, Evan");
// });