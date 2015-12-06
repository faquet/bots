'use strict';

var Message = require('mongoose').model('Message');

var parse = function parse(text, key) {
  return text.toLowerCase().includes(key.toLowerCase());
};

var MessageKeeper = {
  init: function init() {
    console.log('<<messagekeeper init>>,');
    return this;
  },
  funnel: function funnel(data, cb) {
    var _this = this;

    this.regulate(data, function () {
      var text = _this.sanitize(data.text);
      var messageConfig = {
        message: text,
        user: data.user
      };

      Message.create(messageConfig, function (err, message) {
        return cb(message);
      });
    });
  },
  regulate: function regulate(data, cb) {
    if (data.type === 'message' && !parse(data.text, 'remind me') && !parse(data.text, 'image me')) {
      cb();
    }
  },
  sanitize: function sanitize(message) {
    if (message.slice(-1).match(/[.,!?]/g) === null) {
      return message + '.';
    } else {
      return message;
    }
  }
};

module.exports = MessageKeeper;