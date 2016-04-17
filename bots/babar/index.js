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
// Pancakes.createMessage('thoughts pancakes?', "Who really is Babar? Why is Babar? These are the questions we must ask. For the lecture today we are going to talk existentialism. Existentialism, you see, was pioneered by Edward Kant formally of the 1800s, and candidly concentrated consequentially on the indelible unknowable fantastical process of the human soul and minutia of knowledge that may or may not be be. So that one and ones have thought of this one, Kant, as a person of personable parenthetical interest, you know, you might say you truly and unknowably Kant know Kant, hur hur. hurhurhur.");



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
    `We should really get some fish in chups.`,
    `Chicken.`,
    `Land octupus would be scary as hail. Much scarier than land spiders. I mean, can you imagine getting back home, turning on the lights, and hearing a few suction cup poping sounds above you? And you look up and then plop. right on your face. a land octupus. and now you're blind and frightened and waving your arms around because the land octupus is hugging your face. It won't let go because it too is now blind and frightened because you turned on the light and woke it from a deep cephalopodic slumber and now your intrusive screams are reverberating throughout its soft body. It's all a horrible misunderstanding which too often results in the accidental deaths of land octupi and humans alike. That's the scariest part I think, dying on accident or dying because of a misunderstanding, dying by mistake.  Your life should have continued, but didn't, abbreviated for whatever reason. There's no control in that kind of death.  But when it comes down to it, it makes u appreciate land spiders and how small they are. I mean. Wow. They are really really small. Like approximately 85,000x-smaller-than-you small. I bet if you hollowed out a tooth a land spider could crawl in it and walk around like a hermit crab.`
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

