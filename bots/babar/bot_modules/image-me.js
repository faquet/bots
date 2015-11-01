'use strict';

let request = require('request'),
    _ = require('underscore'),
    store = require('../config/store'),
    qs = require('querystring');

let ImageMe = {

  search: (text, send_message) => {

    if (store.googleCseId && store.googleApiKey) {
      let q = {
        q: text,
        searchType:'image',
        safe:'high',
        fields:'items(link)',
        cx: store.googleCseId,
        key: store.googleApiKey
      },
      uri = 'https://www.googleapis.com/customsearch/v1',
      google_callback = (err, res, body) => {
        if (!err && res.statusCode === 200 && JSON.parse(body).items) {
          let info = JSON.parse(body);
          let random_index = _.random(0, (info.items.length - 1));
          let link = info.items[random_index]['link'];
          send_message(link);
          return;
        }
        if (err) {
          return console.log('request error: ', err);
        }
        if (res.statusCode !== 200) {
          return console.log('bad request: ', res.statusCode);
        }
      };

      request({qs: q, uri: uri, method: 'GET'}, google_callback);

    } else {
      return console.log("error: missing environment variables");
    }
  }


};

module.exports = ImageMe;