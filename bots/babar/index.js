
'use strict';

const _ = require('underscore'),
store = require('./config/store'),
Modules = require('./bot_modules/index'),
Bot = require('./config/bot');


module.exports = function() {

  let babar = new Bot(store);

  babar.on('start', () => {
    console.log('Babar can\'t feel his legs');
  });

  babar.on('message', (data) => {
    Modules.onMessage(data);
    console.log('message data: ', data);
  });

}();