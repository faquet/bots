'use strict';

const request = require('request'),
    _ = require('underscore'),
    store = require('../config/store'),
    qs = require('querystring');

const ImageMe = {

  search: (text, send_message) => {

    if (store.googleCseId && store.googleApiKey) {
      let query = {
        q: text,
        searchType:'image',
        safe:'high',
        fields:'items(link)',
        cx: store.googleCseId,
        key: store.googleApiKey
      },
      uri = 'https://www.googleapis.com/customsearch/v1',
      google_callback = (err, res, body) => {
        if (!err && res.statusCode === 200) {
          let info = JSON.parse(body);
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

    } else {
      return console.log("error: missing environment variables");
    }
  }


};

module.exports = ImageMe;
