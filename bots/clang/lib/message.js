'use strict';
const cred = require('./credentials');
const api = require('./api');

const postMessage = (text) => {
  let params = cred.attributes;
  params.token = cred.token;
  params.channel = cred.roughhouse;
  params.text = text;
  console.log(params);
  api('chat.postMessage', params)
    .then((data) => {
      console.log(data);
    })
};

module.exports.postMessage = postMessage;