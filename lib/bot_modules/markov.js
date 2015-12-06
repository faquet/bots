'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = require('mongoose').model('Message');

var parse = function parse(text, key) {
  return text.toLowerCase().includes(key.toLowerCase());
};

var random = function random(array) {
  return array[Math.floor(Math.random() * array.length)];
};

var capitalize = function capitalize(wordList) {
  var tmpList = Object.keys(wordList).filter(function (word) {
    return word[0] >= 'A' && word[0] <= 'Z';
  });
  return tmpList[~ ~(Math.random() * tmpList.length)];
};

var ofType = function ofType(file) {
  return file.indexOf('.' + path.sep) === 0 || file.indexOf(path.sep) === 0;
};

var select = function select(obj) {
  var keys = Object.keys(obj);
  var sum = keys.reduce(function (p, c) {
    return p + obj[c];
  }, 0);

  if (!Number.isFinite(sum)) {
    throw new Error('All values in object must be a numeric value');
  }

  var selection = ~ ~(Math.random() * sum);

  for (var i = 0, count = 0; i < keys.length; i++) {
    count += obj[keys[i]];
    if (count > selection) {
      return keys[i];
    }
  }
};

var MarkovChain = (function () {
  function MarkovChain(args) {
    _classCallCheck(this, MarkovChain);

    if (!args) {
      args = {};
    }

    this.bank = {};
    this.sentence = '';
    this.text = [];

    if (args.text) {
      return this.use(args.text);
    }

    this.startFn = function (wordList) {
      var k = Object.keys(wordList);
      var l = k.length;

      return k[~ ~(Math.random() * l)];
    };

    this.endFn = function () {
      return this.sentence.split(' ').length > 7;
    };

    return this;
  }

  _createClass(MarkovChain, [{
    key: 'use',
    value: function use(text) {
      if (typeof text === 'array') {
        this.text = text;
      } else if (typeof text === 'string') {
        this.text = [text];
      } else {
        throw new Error('Need to pass a string or array for use()');
      }
      return this;
    }
  }, {
    key: 'countTotal',
    value: function countTotal(word) {
      var total = 0;

      for (var prop in this.bank[word]) {
        if (this.bank[word].hasOwnProperty(prop)) {
          total += this.bank[word][prop];
        }
      }
      return total;
    }
  }, {
    key: 'runProcess',
    value: function runProcess(callback) {
      var _this = this;

      new Promise(function (resolve, reject) {
        var texts = [];
        _this.text.forEach(function (text) {
          texts.push(text);
        });
        return resolve(texts);
      }).then(function (texts) {
        var curWord = undefined;
        _this.parseFile(texts.toString());
        curWord = _this.startFn(_this.bank);
        _this.sentence = curWord;

        while (_this.bank[curWord] && !_this.endFn()) {
          curWord = select(_this.bank[curWord]);
          _this.sentence += ' ' + curWord;
        }
        callback(null, _this.sentence.trim());
      });

      return this;
    }
  }, {
    key: 'parseFile',
    value: function parseFile(file) {
      var _this2 = this;

      file.split(/(?:\. |\n)/ig).forEach(function (lines) {
        var words = lines.split(' ').filter(function (w) {
          return w.trim() !== '';
        });

        for (var i = 0; i < words.length - 1; i++) {
          var curWord = _this2.normalize(words[i]);
          var nextWord = _this2.normalize(words[i + 1]);

          if (!_this2.bank[curWord]) {
            _this2.bank[curWord] = {};
          }
          if (!_this2.bank[curWord][nextWord]) {
            _this2.bank[curWord][nextWord] = 1;
          } else {
            _this2.bank[curWord][nextWord] += 1;
          }
        }
      });
    }
  }, {
    key: 'start',
    value: function start(fnStr) {
      var startType = typeof fnStr === 'undefined' ? 'undefined' : _typeof(fnStr);
      console.log('start:', startType);

      if (startType === 'string') {
        this.startFn = function () {
          return fnStr;
        };
      } else if (startType === 'function') {
        this.startFn = function (wordList) {
          return fnStr(wordList);
        };
      } else {
        throw new Error('Must pass a function, or string into start()');
      }
      return this;
    }
  }, {
    key: 'end',
    value: function end(fnStrOrNum) {
      var _this3 = this;

      var endType = typeof fnStrOrNum === 'undefined' ? 'undefined' : _typeof(fnStrOrNum);

      if (endType === 'function') {
        this.endFn = function () {
          return fnStrOrNum(this.sentence);
        };
      } else if (endType === 'string') {
        this.endFn = function () {
          return _this3.sentence.split(' ').slice(-1)[0] === fnStrOrNum;
        };
      } else if (endType === 'number' || fnStrOrNum === undefined) {
        fnStrOrNum = fnStrOrNum || Infinity;
        this.endFn = function () {
          return _this3.sentence.split(' ').length > fnStrOrNum;
        };
      } else {
        throw new Error('Must pass a function, string or number into end()');
      }
      return this;
    }
  }, {
    key: 'normalize',
    value: function normalize(word) {
      return word.replace(/\.$/ig, '');
    }
  }]);

  return MarkovChain;
})();

;

var MarkovMe = {
  init: function init() {
    console.log('<<markov init>>,');
    return this;
  },
  getMessageHistory: function getMessageHistory() {
    var _this4 = this;

    return new Promise(function (resolve, reject) {
      Message.find({}, (function (err, docs) {
        var messages = docs.map(function (doc) {
          return doc.message;
        });
        resolve(this.toStr(messages));
      }).bind(_this4));
    });
  },
  funnel: function funnel(data, send_message) {
    var _this5 = this;

    console.log('markov funnel');
    if (parse(data.text, 'babar')) {
      (function () {
        var word = _this5.pickWord(data.text);
        _this5.getMessageHistory().then(function (messages) {
          console.log('messages', messages);
          new MarkovChain({ text: messages }).start(word).end().runProcess(function (err, sentence) {
            console.log('sentence', sentence);
            send_message(_this5.sanitizeSentence(sentence));
            return;
          }).bind(_this5);
        });
      })();
    }
  },
  pickWord: function pickWord(text) {
    return random(this.toArr(text));
  },
  sanitizeSentence: function sanitizeSentence(sentence) {
    var capitalized = this.capitalizeFirstLetter(sentence);
    var punctuated = this.punctuateSentenceEnd(capitalized);
    return punctuated;
  },
  toStr: function toStr(messages) {
    return messages.join(' ').replace(/"/g, "");
  },
  toArr: function toArr(text) {
    return text.match(/('\w+)|(\w+'\w+)|(\w+')|(\w+)/ig);
  },
  capitalizeFirstLetter: function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  punctuateSentenceEnd: function punctuateSentenceEnd(string) {
    if (string.slice(-1).match(/[.,!?]/g) === null) {
      return string + random(['.', '.', '.', '.', '?']);
    } else {
      return string;
    }
  }
};

module.exports = MarkovMe;