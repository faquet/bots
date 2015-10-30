'use strict';

/**
 * Posts a message to a channel
 * @param   {string}  token
 * @param   {string}  channel
 * @param   {string}  text
 * @returns {Promise}
 */
const postMessage = (params) => {
  this.api('chat.postMessage', params).then((data) => {
    console.log(data);
  });
};

module.exports = postMessage;