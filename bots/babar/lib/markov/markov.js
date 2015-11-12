'use strict';
const utils = require('./utils');

module.exports = class MarkovChain {
  constructor(args) {
    if (!args) {
      args = {};
    }

    this.bank = {};
    this.sentence = '';
    this.text = [];

    if (args.text) {
      return this.use(args.text);
    }

    this.startFn = function(wordList) {
      let k = Object.keys(wordList);
      let l = k.length;

      return k[~~(Math.random()*l)];
    };

    this.endFn = function() {
      return this.sentence.split(' ').length > 7;
    };

    return this;
  }
  use(text) {
    if (typeof text === 'array') {
      this.text = text;
    } else if (typeof text === 'string') {
      this.text = [text];
    } else {
      throw new Error('Need to pass a string or array for use()');
    }
    return this;
  }
  countTotal(word) {
    let total = 0;

    for (let prop in this.bank[word]) {
      if (this.bank[word].hasOwnProperty(prop)) {
        total += this.bank[word][prop];
      }
    }
    return total;
  }
  runProcess(callback) {
    new Promise((resolve, reject) => {
      let texts = [];
      this.text.forEach((text) => {
        texts.push(text);
      });
      return resolve(texts);
    }).then((texts) => {
      let curWord;
      this.parseFile(texts.toString());
      curWord = this.startFn(this.bank);
      this.sentence = curWord;

      while (this.bank[curWord] && !this.endFn()) {
        curWord = utils.select(this.bank[curWord]);
        this.sentence += ' ' + curWord;
      }
      callback(null, this.sentence.trim());
    });

    return this;
  }
  parseFile(file) {
    file.split(/(?:\. |\n)/ig).forEach((lines) => {
      let words = lines.split(' ').filter((w) => {
        return (w.trim() !== '');
      });

      for (let i = 0; i < words.length - 1; i++) {
        let curWord = this.normalize(words[i]);
        let nextWord = this.normalize(words[i + 1]);

        if (!this.bank[curWord]) {
          this.bank[curWord] = {};
        }
        if (!this.bank[curWord][nextWord]) {
          this.bank[curWord][nextWord] = 1;
        } else {
          this.bank[curWord][nextWord] += 1;
        }
      }

    });
  }
  start(fnStr) {
    let startType = typeof fnStr;
    console.log('start:', startType);

    if (startType === 'string') {
      this.startFn = () => {
        return fnStr;
      };
    } else if (startType === 'function') {
      this.startFn = (wordList) => {
        return fnStr(wordList);
      };
    } else {
      throw new Error('Must pass a function, or string into start()');
    }
    return this;
  }
  end(fnStrOrNum) {
    let endType = typeof fnStrOrNum;

    if (endType === 'function') {
      this.endFn = function() {
        return fnStrOrNum(this.sentence);
      };
    } else if (endType === 'string') {
      this.endFn = () => {
        return this.sentence.split(' ').slice(-1)[0] === fnStrOrNum;
      };
    } else if (endType === 'number' || fnStrOrNum === undefined) {
      fnStrOrNum = fnStrOrNum || Infinity;
      this.endFn = () => {
        return this.sentence.split(' ').length > fnStrOrNum;
      };
    } else {
      throw new Error('Must pass a function, string or number into end()');
    }
    return this;
  }
  normalize(word) {
    return word.replace(/\.$/ig, '');
  }
};