 'use strict';
 let Image = require('./image-search.js');
 

 let Message = {

    findResponse: (dataText) => {
      Message.response = null;
      Message.hello(dataText);
      Message.water(dataText);
      Message.tomorrow(dataText);
      Message.kwak(dataText);
      Message.test(dataText);
      Message.wwe(dataText);
      return Message.response;
    },

    imageMe: (dataText) => {
      if (Message.parseText(dataText, 'image me')) {
        return true;
      }
    },

    findImage: (text, cb) => {
        let searchCriteria = text.match(/(image me)? (.*)/i).pop();
        console.log('message,', searchCriteria);
        Image.search(searchCriteria, (link) => {
          console.log('hell!', link);
          cb(link);
        });
    },

    parseText: (text, key) => {
      return text.toLowerCase().indexOf(key.toLowerCase()) >= 0;
    },

    hello: (text) => {
      if (Message.parseText(text, 'Hey Babar')) {
        Message.response = 'WHAT WHAT IS IT LEAVE ME ALONE';
      }
    },

    water: (text) => {
      if (Message.parseText(text, 'water')) {
        Message.response = 'Babar only drinks the blood of enemies';
      }
    },

    tomorrow: (text) => {
      if (Message.parseText(text, 'tomorrow, Babar?')) {
        Message.response = 'Well, I\'m going to polka dancing with Charlene, my sex-ambiguous escort, and then later I\'m eating a family-sized bag of Combos and watching Maury';
      }
    },

    kwak: (text) => {
      if (Message.parseText(text, 'Babar wants a cracker?')) {
        Message.response = 'Kwak kwak kwak kwak kwak';
      }
    },

    test: (text) => {
      if (Message.parseText(text, 'test')) {
        Message.response = 'test deez nuts';
      }
    },

    wwe: (text) => {
      if (Message.parseText(text, 'wwe')) {
        Message.response = "WELCOME LIVE TO WWWWE RAW 3000 LET'S GET SOME OKEEEE I AM THE COMING MESSIAH OF SUMOPLEXES GONNA LIBERATE YOUR SOULS, I WEAR THE FOOD CHAIN AS A BELT, MOUNTAINS QUIVER AND BOW DOWN BEFORE ME, THE THREE LITTLE PIGS AINT GOT NUTHIN ON ME.";
      }
    },



  };

  module.exports = Message;



