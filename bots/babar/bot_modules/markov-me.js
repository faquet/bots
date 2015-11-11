'use strict';

const Message = require('mongoose').model('Message');
const MarkovChain = require('./markov');
const utils = require('./utils');
const fs = require('fs');
const parse = require('../config/utils').parse;
// const m = new MarkovChain({files: fs.readFileSync( __dirname + '/wat.txt')});


const MarkovMe = {

  getText() {
    return new Promise((resolve, reject) => {
      Message.find({}, function(err, data) {
        const messages = data.map((message) => {
          return message.message;
        });
        resolve(messages.join(' '));
      });
    });
  },

  get(data, send_message) {
    if (data.type === 'message' && parse(data.text, 'babar')) {
      console.log('text: ', data.text.match(/('\w+)|(\w+'\w+)|(\w+')|(\w+)/ig));
      let word = utils.random(data.text.match(/('\w+)|(\w+'\w+)|(\w+')|(\w+)/ig));
      this.getText().then((val)=> {
        // console.log('text: ', val);
        // return new Promise((resolve, reject) => {
          console.log('word', word);
          new MarkovChain({files: val})
             .start(word).end().runProcess((err, sentence) => {
              console.log('sentence>>>>>>', sentence);
               send_message(sentence);
               return;
              });
        // });
        // .then((thing) => {
        //     console.log('thing: ', thing);
        // });
        // m.start(data.message).end(5).process(function(err, s) {
        // });
      });
    }
  }



};

module.exports = MarkovMe;