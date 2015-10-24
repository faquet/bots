
'use strict';

let _ = require('underscore'),
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
    console.log('starting');
  });
  
  babar.on('message', (data) => {
    console.log('data: ', data);
    if (data.username === 'babar') {return;}
    if (data.type === 'message') {
      initResponses(data.text);
    }
  });

  let initResponses = (dataText) => {
    hello(dataText);
    water(dataText);
    tomorrow(dataText);
  };

  let parseText = (text, key) => {
    return _.contains(text.split(' '), key);
  };

  let response = (responseText) => {
    babar.postMessageToChannel('general', responseText, babar.params);
  };

  let hello = (text) => {
    console.log('text: ', text);
    console.log('parsettext: ', parseText(text, 'Babar'));
    if (parseText(text, 'Babar')) {
      response('WHAT WHAT IS IT LEAVE ME ALONE');
    }
  };

  let water = (text) => {
    if (parseText(text, 'water')) {
      response('Babar only drinks the blood of enemies');
    }
  };

  let tomorrow = (text) => {
    if (parseText(text, 'tomorrow')) {
      response('Well, I\'m going to polka dancing with Charlene, my sex-ambiguous escort, and then later I\'m eating a family-sized bag of Combos and watching Maury');
    }
  };







}();