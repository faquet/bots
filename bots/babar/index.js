
'use strict';

let Bot = require('slackbots');

module.exports = () => {

  let babar = new Bot({
      token: process.env.BABAR_KEY,
      name: 'babar'
  });

  babar.params = {
    icon_url: 'http://i.imgur.com/p51tcBd.jpg?1',
  };

  babar.on('start', () => {
    console.log('starting');
  });
  
  babar.on('message', (data) => {
    console.log('data: ', data);
    console.log('babar params: ', babar.params);
    if (data.type === 'message' && data.username !== 'babar' && data.text === 'Want some water Babar?') {
      babar.postMessageToChannel('general', 'Babar only drinks the blood of enemies', babar.params);
    }
    if (data.type === 'message' && data.username !== 'babar' && data.text === 'Babar, what are you doing tomorrow?') {
      babar.postMessageToChannel('general', 'Well, I\'m going to polka dancing with Charlene, my sex-ambiguous escort, and then later I\'m eating a family-sized bag of Combos and watching Maury', babar.params);
    }
  });



}();