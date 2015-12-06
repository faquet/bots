'use strict';

var request = require('request'),
    _ = require('underscore'),
    qs = require('querystring'),
    app = require('../index'),
    credentials = app.credentials;

var parse = function parse(text, key) {
  return text.toLowerCase().includes(key.toLowerCase());
};

var Image = {

  init: function init(params) {
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

  funnel: function funnel(data, send_message) {

    if (parse(data.text, 'image me')) {

      var searchCriteria = data.text.match(/(image me)? (.*)/i).pop();

      var query = {
        q: searchCriteria,
        searchType: 'image',
        safe: 'high',
        fields: 'items(link)',
        cx: this.googleCseId,
        key: this.googleApiKey
      };

      var uri = 'https://www.googleapis.com/customsearch/v1';

      var google_callback = function google_callback(err, res, body) {
        if (!err && res.statusCode === 200) {
          var info = JSON.parse(body);
          var random_index = _.random(0, info.items.length - 1);
          var link = info.items[random_index]['link'];
          send_message(link);
          return;
        }
        if (err || res.statusCode !== 200) {
          console.log('response code: ', res.statusCode);
          return console.log('request error: ', err);
        }
      };
      request({ qs: query, uri: uri, method: 'GET' }, google_callback);
    }
  }

};

module.exports = Image;