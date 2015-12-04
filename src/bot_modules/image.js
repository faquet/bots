'use strict';

const request = require('request'),
    _ = require('underscore'),
    qs = require('querystring'),
    app = require('../index'),
    credentials = app.credentials;


const parse = (text, key) => {
  return text.toLowerCase().includes(key.toLowerCase());
};

const Image = {

  init: function(params) {
    if (params.googleCseId && params.googleApiKey) {
      this.googleCseId = params.googleCseId;
      this.googleApiKey = params.googleApiKey;
    } else if (credentials) {
      this.googleCseId = credentials.googleCseId;
      this.googleApiKey = credentials.googleApiKey;
    } else {
      throw new Error('please provide google keys');
    }

    return this;
  },

  funnel: function(data, send_message) {

    if (parse(data.text, 'image me')) {

      let searchCriteria = data.text.match(/(image me)? (.*)/i).pop();

      let query = {
        q: searchCriteria,
        searchType:'image',
        safe:'high',
        fields:'items(link)',
        cx: this.googleCseId,
        key: this.googleApiKey
      };

      let uri = 'https://www.googleapis.com/customsearch/v1';

      let google_callback = (err, res, body) => {
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
    }
  }


};

module.exports = Image;
