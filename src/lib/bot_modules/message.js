'use strict';

const parse = require('../utils').parse;

function Message(store) {


  Message.init = function(data, send_message) {
    if (data.type === 'message') {
      let text = data.text;
      // this.hello(text, send_message);
      this.water(text, send_message);
      this.tomorrow(text, send_message);
      this.kwak(text, send_message);
      this.test(text, send_message);
      this.wwe(text, send_message);
    }
  };

  Message.hello = function(text, send_message) {
    if (parse(text, 'Hey Babar')) {
      return send_message('WHAT WHAT IS IT LEAVE ME ALONE');
    }
  };

  Message.water = function(text, send_message) {
    if (parse(text, 'water')) {
      return send_message('Babar only drinks the blood of enemies');
    }
  };

  Message.tomorrow = function(text, send_message) {
    if (parse(text, 'tomorrow, Babar?')) {
      return send_message('Well, I\'m going to polka dancing with Charlene, my sex-ambiguous escort, and then later I\'m eating a family-sized bag of Combos and watching Maury');
    }
  };

  Message.kwak = function(text, send_message) {
    if (parse(text, 'Babar wants a cracker?')) {
      return send_message('Kwak kwak kwak kwak kwak');
    }
  };

  Message.test = function(text, send_message) {
    if (parse(text, 'test')) {
      return send_message('test deez nuts');
    }
  };

  Message.wwe = function(text, send_message) {
    if (parse(text, 'wwe')) {
      return send_message("WELCOME LIVE TO WWWWE RAW 3000 LET'S GET SOME OKEEEE I AM THE COMING MESSIAH OF SUMOPLEXES GONNA LIBERATE YOUR SOULS, I WEAR THE FOOD CHAIN AS A BELT, MOUNTAINS QUIVER AND BOW DOWN BEFORE ME, THE THREE LITTLE PIGS AINT GOT NUTHIN ON ME.");
    }
  };

  return Message;


};


module.exports = Message;
