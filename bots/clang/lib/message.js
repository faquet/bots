'use strict';
const api = require('./api');

const postMessage = (params) => {
  api('chat.postMessage', params).then((data) => {
    console.log(data);
  });
};

module.exports = postMessage;