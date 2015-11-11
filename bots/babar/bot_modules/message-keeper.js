const Message = require('mongoose').model('Message');
const parse = require('../config/utils').parse;

const MessageKeeper = {

  saveMessage(data) {

    if (data.type === 'message' && !parse(data.text, 'babar')) {

      const messageConfig = {
        message: data.text,
        user: data.user,   
      };

      Message.create(messageConfig, function(err, message){
        console.log('messagecb', message);
      });
    }
  }

};


module.exports = MessageKeeper;