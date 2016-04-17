'use strict';

const request = require('request'),
    _ = require('underscore'),
    qs = require('querystring'),
    app = require('../index'),
    credentials = app.credentials;


const parse = (text, key) => {
  return text.toLowerCase().includes(key.toLowerCase());
};

const Gif = {

  init: function(params) {
    console.log('<<<<init gif>>>>');
    if (params.giphy) {
      this.giphy = params.giphy;
    } else if (credentials) {
      this.giphy = credentials.giphy;
    } else {
      throw new Error('please provide giphy public key');
    }

    return this;
  },

  funnel: function(data, send_message) {
    console.log('funnel data, send_mesage', data, send_message);

    if (parse(data.text, 'gif me')) {

      let searchCriteria = data.text.match(/(gif me)? (.*)/i).pop();

      let query = {
        q: searchCriteria,
        limit: 25, // max is 100
        api_key: this.giphy
      };

      console.log('query', query);

      let uri = 'http://api.giphy.com/v1/gifs/search';

      let giphy_callback = (err, res, body) => {
        console.log('info', res);
        if (!err && res.statusCode === 200) {
          let info = JSON.parse(body);
          console.log('info', info);
          let random_index = _.random(0, (info.data.length - 1));
          let link = info.data[random_index]['url'];
          send_message(link);
          return;
        }
        if (err || res.statusCode !== 200) {
          console.log('response code: ', res.statusCode);
          return console.log('request error: ', err);
        }
      };
      request({qs: query, uri: uri, method: 'GET'}, giphy_callback);
    }
  }


};

module.exports = Gif;