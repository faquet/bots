'use strict';
const Bot = require('../src');

const bots = [
  {
    name: 'clang',
    active: true
  },{
    name: 'babar',
    active: false
  }
];

module.exports = () => {
  for (let bot of bots) {
    if (bot.active) {
      Bot(require(`./${bot.name}`));
    }
  }
};
