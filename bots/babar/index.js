
'use strict';

let _ = require('underscore'),
    Message = require('./message.js'),
    Bot = require('slackbots');

module.exports = () => {

  let babar = new Bot({
    token: process.env.BABAR_KEY,
    name: 'babar',
  });

  babar.params = {
    icon_url: 'http://i.imgur.com/p51tcBd.jpg?1',
  };

  babar.on('start', () => {
    console.log('Babar can\'t feel his legs');
  });
  
  babar.on('message', (data) => {
    if (data.username === 'babar') {return;}
    if (data.type === 'message' && Message.findResponse(data.text)) {
      babar.postMessageToChannel('general', Message.response, babar.params);
    }
  });



}();