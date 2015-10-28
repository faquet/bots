 'use strict';
 let store = require('../store'),
     ImageMe = require('./image-me'),
     Slack = require('../controllers/slack');

 let Message = {

  init: function(data) {
    if (data.username === 'babar') {return;}
    if (data.type === 'message' && this.findResponse(data.text)) {
      Slack.postMessageToChannel('test', this.response, store.post_params);
    }
    if (data.type === 'message' && this.imageMe(data.text)) {
      this.findImage(data.text, (link) => {
        Slack.postMessageToChannel('test', link, store.post_params);
      });
    }
  },

  findResponse: function(dataText) {
    this.response = null;
    this.hello(dataText);
    this.water(dataText);
    this.tomorrow(dataText);
    this.kwak(dataText);
    this.test(dataText);
    this.wwe(dataText);
    return this.response;
  },

  imageMe: function(dataText) {
    if (this.parseText(dataText, 'image me')) {
      return true;
    }
  },

  findImage: function(text, message_cb) {
    let searchCriteria = text.match(/(image me)? (.*)/i).pop();
    ImageMe.search(searchCriteria, (link) => {
      message_cb(link);
    });
  },

  parseText: function(text, key) {
    return text.toLowerCase().indexOf(key.toLowerCase()) >= 0;
  },

  hello: function(text) {
    if (this.parseText(text, 'Hey Babar')) {
      this.response = 'WHAT WHAT IS IT LEAVE ME ALONE';
    }
  },

  water: function(text) {
    if (this.parseText(text, 'water')) {
      this.response = 'Babar only drinks the blood of enemies';
    }
  },

  tomorrow: function(text) {
    if (this.parseText(text, 'tomorrow, Babar?')) {
      this.response = 'Well, I\'m going to polka dancing with Charlene, my sex-ambiguous escort, and then later I\'m eating a family-sized bag of Combos and watching Maury';
    }
  },

  kwak: function(text) {
    if (this.parseText(text, 'Babar wants a cracker?')) {
      this.response = 'Kwak kwak kwak kwak kwak';
    }
  },

  test: function(text) {
    if (this.parseText(text, 'test')) {
      this.response = 'test deez nuts';
    }
  },

  wwe: function(text) {
    if (this.parseText(text, 'wwe')) {
      this.response = "WELCOME LIVE TO WWWWE RAW 3000 LET'S GET SOME OKEEEE I AM THE COMING MESSIAH OF SUMOPLEXES GONNA LIBERATE YOUR SOULS, I WEAR THE FOOD CHAIN AS A BELT, MOUNTAINS QUIVER AND BOW DOWN BEFORE ME, THE THREE LITTLE PIGS AINT GOT NUTHIN ON ME.";
    }
  },


};

module.exports = Message;



