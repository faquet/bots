 'use strict';
 let store = require('../config/store'),
     ImageMe = require('./image-me'),
     RemindMe = require('./remind-me'),
     MessageMe = require('./message-me'),
     parse = require('../config/utils').parse,
     Slack = require('../controllers/slack');

 let Modules = {

  onMessage: function(data) {
    if (data.username === 'babar') {return;}

    this.messageMe(data);
    this.imageMe(data);
    this.remindMe(data);
  },

  messageMe: function(data) {
    if (data.type === 'message') {
      MessageMe.findResponse(data.text, (message) => {
        Slack.postMessage(data.channel, message, store.post_params);
      });
    }
  },

  remindMe: function(data) {
    if (data.type === 'message' && parse(data.text, 'remind me')) {
      let reminderData = data.text.match(/(\d+)\s(\w+)(?:\sto\s|\s)"([^"]*)"/i);
      RemindMe.create(reminderData, (reminder) => {
        Slack.postMessage(data.channel, reminder, store.post_params);
      });
    }
  },

  imageMe: function(data) {
    if (data.type === 'message' && parse(data.text, 'image me')) {
      let searchCriteria = data.text.match(/(image me)? (.*)/i).pop();
      ImageMe.search(searchCriteria, (link) => {
        Slack.postMessage(data.channel, link, store.post_params);
      });
    }
  },




};

module.exports = Modules;



