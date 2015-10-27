'use strict';
const request = require('request');
const qs = require('querystring');

const api = (method, params) => {
  let query = qs.stringify(params);
  let path = `${method}?${query}`;
  let url = `https://slack.com/api/${path}`;

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let data = JSON.parse(body);
        resolve(data);
      }
    });
  });
};

module.exports = api;