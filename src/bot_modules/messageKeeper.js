'use strict';

const Message = require('mongoose').model('Message');

const parse = (text, key) => {
  return text.toLowerCase().includes(key.toLowerCase());
};


const MessageKeeper = {

  init() {
    console.log('<<messagekeeper init>>,');
    return this;
  },

  funnel(data, cb) {
    this.regulate(data, () => {
      const text = this.sanitize(data.text);
      const messageConfig = {
        message: text,
        user: data.user,
      };

      Message.create(messageConfig, function(err, message){
        return cb(message);
      });
    });
  },

  regulate(data, cb){
    if ( 
      data.type === 'message' &&
      !parse(data.text, 'remind me') &&
      !parse(data.text, 'image me')
    ) {
      cb();
    }
  },

  sanitize(message) {
    if (message.slice(-1).match(/[.,!?]/g) === null) {
      return message + '.';
    } else {
      return message;
    }
  }



};


module.exports = MessageKeeper;