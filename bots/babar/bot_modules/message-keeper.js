'use strict';

const Message = require('mongoose').model('Message');
const parse = require('../config/utils').parse;

const MessageKeeper = {

  saveMessage(data, cb) {
    if (data.type === 'message') {
      const text = this.sanitize(data.text);
      const messageConfig = {
        message: text,
        user: data.user,
      };

      Message.create(messageConfig, function(err, message){
        return cb(message);
      });
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