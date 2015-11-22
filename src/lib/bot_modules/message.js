'use strict';

const parse = require('../utils').parse;

const Message = module.exports = function(){};

  Message.init = function(){
    console.log('<<message init>>,');
    return this;
  };

  Message.funnel = function(data, send_message) {
    if (data.type === 'message') {
      let text = data.text;
      for (let message of Object.keys(this.cache)) {
        this.cache[message](text, send_message);
      }
    }
  };

  Message.create = function(watch_text, bot_response) {
    if (this.cache[watch_text]) { return this.cache[watch_text]; }
    this.cache[watch_text] =  function(text, send_message) {
      if (parse(text, watch_text)) {
        return send_message(bot_response);
      }
    };
  };



  // Message.cache.hello = function(text, send_message) {
  //   if (parse(text, 'Hey Babar')) {
  //     return send_message('WHAT WHAT IS IT LEAVE ME ALONE');
  //   }
  // };

  // Message.cache.water = function(text, send_message) {
  //   if (parse(text, 'water')) {
  //     return send_message('Babar only drinks the blood of enemies');
  //   }
  // };

  // Message.cache.tomorrow = function(text, send_message) {
  //   if (parse(text, 'tomorrow, Babar?')) {
  //     return send_message('Well, I\'m going to polka dancing with Charlene, my sex-ambiguous escort, and then later I\'m eating a family-sized bag of Combos and watching Maury');
  //   }
  // };

  // Message.cache.kwak = function(text, send_message) {
  //   if (parse(text, 'Babar wants a cracker?')) {
  //     return send_message('Kwak kwak kwak kwak kwak');
  //   }
  // };

  // Message.cache.test = function(text, send_message) {
  //   if (parse(text, 'test')) {
  //     return send_message('test deez nuts');
  //   }
  // };

  // Message.cache.wwe = function(text, send_message) {
  //   if (parse(text, 'wwe')) {
  //     return send_message("WELCOME LIVE TO WWWWE RAW 3000 LET'S GET SOME OKEEEE I AM THE COMING MESSIAH OF SUMOPLEXES GONNA LIBERATE YOUR SOULS, I WEAR THE FOOD CHAIN AS A BELT, MOUNTAINS QUIVER AND BOW DOWN BEFORE ME, THE THREE LITTLE PIGS AINT GOT NUTHIN ON ME.");
  //   }
  // };





// module.exports = Message;
