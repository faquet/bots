'use strict';
const Bot = require('../src');

const bots = [
  {
    name: 'clang',
    active: true
  },{
    name: 'babar',
    active: false
  },{
    name: 'borf',
    active: true
  },{
    name: 'johnny-pancakes',
    active: false
  }
];

module.exports = () => {
  for (let bot of bots) {
    if (bot.active) {
      if (bot.name === 'babar') {
        Bot.turn(require(`./${bot.name}/config/babar_store`));
      } else {
        Bot.turn(require(`./${bot.name}`));
      }
    }
  }
};
