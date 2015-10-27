'use strict';
const api = require('./api');

/**
 * Posts a message to a channel
 * @param   {string}  token
 * @param   {string}  channel
 * @param   {string}  text
 * @returns {Promise}
 */
const postMessage = (params) => {
  api('chat.postMessage', params).then((data) => {
    console.log(data);
  });
};

module.exports = postMessage;