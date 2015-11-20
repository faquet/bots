'use strict';

const request = require('request'),
    _ = require('underscore'),
    qs = require('querystring'),
    parse = require('../utils').parse;

const Image = {

  init: function(params) {
    if (!params.googleCseId || !params.googleApiKey) { 
      throw new Error('please provide google keys');
    }

    this.googleCseId = params.googleCseId;
    this.googleApiKey = params.googleApiKey;

  },

  funnel: function(data, send_message) {

    if (data.type === 'message' && 
        parse(data.text, 'image me')) {

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
