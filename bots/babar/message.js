 
 Message = {

    findResponse: (dataText) => {
      Message.response = null;
      Message.hello(dataText);
      Message.water(dataText);
      Message.tomorrow(dataText);
      Message.kwak(dataText);
      Message.test(dataText);
      return Message.response;
    },

    parseText: (text, key) => {
      // console.log('parsetex text: ', text);
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
            console.log('text: ', text);
      console.log('parsettext: ', Message.parseText(text, 'Babar wants a cracker?'));
      if (Message.parseText(text, 'Babar wants a cracker?')) {
        Message.response = 'Kwak kwak kwak kwak kwak';
      }
    },

    test: (text) => {
      if (Message.parseText(text, 'test')) {
        Message.response = 'test deez nuts';
      }
    }

  };

  module.exports = Message;



