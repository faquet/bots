
'use strict';

const _ = require('underscore'),
store = require('./config/store'),
Slack = require('./controllers/slack'),
Bot = require('./config/bot');


module.exports = function() {

  let babar = new Bot(store);

  babar.on('start', () => {
    console.log('Babar can\'t feel his legs');
  });

  babar.on('message', (data) => {
    Slack.onMessage(data);
    console.log('message data: ', data);
  });

}();