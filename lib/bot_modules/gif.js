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
    console.log('>>>>>>>>>>>>>>>>>GIFS STUF', params);
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

    if (parse(data.text, 'gif me')) {

      let searchCriteria = data.text.match(/(image me)? (.*)/i).pop();

      let query = {
        q: searchCriteria,
        limit: 25, // max is 100
        api_key: this.giphy
      };

      let uri = 'https://www.giphy.com/v1/gifs/search';

      let giphy_callback = (err, res, body) => {
        if (!err && res.statusCode === 200) {
          let info = JSON.parse(body);
          console.log('info', info);
          let random_index = _.random(0, (info.items.length - 1));
          let link = info.items[random_index]['link'];
          send_message(link);
          return;
        }
        if (err || res.statusCode !== 200) {
          console.log('response code: ', res.statusCode);
          return console.log('request error: ', err);
        }
      };
      request({qs: query, uri: uri, method: 'GET'}, google_callback);
    }
  }


};

module.exports = Gif;