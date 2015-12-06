'use strict';

const Babar_Store = require('./config/babar_store');
const Babar = require('../../src').hold(Babar_Store);

const Pancakes_Store = require('./config/pancakes_store');
const Pancakes = require('../../src').hold(Pancakes_Store);


// A couple simple listeners for chatroom phrases and their bot responses

Babar.createMessage('yoyo', 'plickity-plow');
Babar.createMessage('How are all my lovely bottie-wotties doing today????', 'Go fuck yourself.');
Pancakes.createMessage('pancakes ready', 'oh boy oh boy oh boy');
Pancakes.createMessage('randy', 'randy for pancakes?');



///////////
//  Bot listener methods
/////////////

// Bot Emitter Methods
const start = () => {
  Babar.emit('event', "holy bupkis");    // not listening for this event yet...
};
const message = (data) => {
  if (data.subtype === 'message_doesnt_like_tone') {
    babarDoesntLikeOtherBotsTone(data);
  }
  if (data.user === 'U0D1VGD0W' && 10 === Math.floor((Math.random() * 10) + 1)) {
    Babar.emit('message_complement', data);
  }
};



// Bot Post Methods
const babarDoesntLikeOtherBotsTone = (data) => {
  setTimeout(() => {
    Babar.postMessage(data.channel, "I don't like your tone, " + data.username);
  }, 3000);
};
const bot_complement = (data) => {
  const complements = [
    `You're the bees vagina!`,
    `You quack like a duck better than anyone I know`,
    `You make Steve Harvey look like Steve Harvey`,
    `Can't image what life on this planet would be without you.
    A cold desert wasteland, remote, desolate, barren . . . just like you
    deep down! Isn't that neat!`,
    `We should really get some fish in chups.`
  ];
  Babar.postMessage(
    data.channel,
    complements[Math.floor((Math.random() * complements.length) - 1)]
  );
};





/////////
// Bot listeners
////////////


// the 'start' and 'message' events are sent from src/lib/socket.js.
// the other two I created to handle the 'message' event.
Babar
.on('start', start)
.on('message', message)
.on('message_doesnt_like_tone', babarDoesntLikeOtherBotsTone)
.on('message_complement', bot_complement);

