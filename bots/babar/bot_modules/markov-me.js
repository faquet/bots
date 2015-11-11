'use strict';

const Message = require('mongoose').model('Message');
const MarkovChain = require('./markov');
const utils = require('./utils');
const parse = require('../config/utils').parse;


const MarkovMe = {

  getMessageHistory() {
    return new Promise((resolve, reject) => {
      Message.find({}, function(err, docs) {
        const messages = docs.map((doc) => {
          return doc.message;
        });
        resolve(this.toStr(messages));
      }.bind(this));
    });
  },

  get(data, send_message) {
    if (data.type === 'message' && parse(data.text, 'babar')) {
      let word = this.pickWord(data.text);
      this.getMessageHistory().then((messages)=> {
        new MarkovChain({text: messages})
          .start(word)
          .end()
          .runProcess((err, sentence) => {
            console.log('sentence>>>>>>', sentence);
            send_message(this.sanitizeSentence(sentence));
            return;
          }).bind(this);
      });
    }
  },

  pickWord(text) {
    let word = utils.random(this.toArr(text));
    console.log('word>>>>>>>>>>>', word);
    return word;
  },

  sanitizeSentence(sentence) {
    let capitalized = this.capitalizeFirstLetter(sentence);
    return capitalized;
  },

  toStr(messages) {
    return messages.join(' ').replace(/"/g, "");
  },

  toArr(text) {
    return text.match(/('\w+)|(\w+'\w+)|(\w+')|(\w+)/ig);
  },

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


};

module.exports = MarkovMe;