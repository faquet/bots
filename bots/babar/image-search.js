'use strict';

let request = require('request'),
_ = require('underscore'),
qs = require('querystring');

let Image = {

  search: (text, message_cb) => {

    let googleCseId = process.env.BOT_GOOGLE_IMAGE_SEARCH_ID,
    googleApiKey = process.env.BOT_GOOGLE_IMAGE_SEARCH_SERVER_KEY;

    console.log('I think that yes', text);
    let result_link;
    if (googleCseId && googleApiKey) {
      let q = {
        q: text,
        searchType:'image',
        safe:'medium',
        fields:'items(link)',
        cx: googleCseId,
        key: googleApiKey
      },
      uri = 'https://www.googleapis.com/customsearch/v1',
      cb = (err, res, body) => {
        console.log('res: ', res);
        if (!err && res.statusCode === 200 && JSON.parse(body).items) {
          let info = JSON.parse(body);
          console.log('info: ', info);
          console.log('rand num: ', _.random(0, (info.items.length - 1)));
          let randItem = _.random(0, (info.items.length - 1));
          console.log('info item link: ', info.items[randItem]);
          let random_link = info.items[randItem]['link'];
          result_link = random_link;
          console.log('result_link: ', result_link);
          message_cb(result_link);
        }
        if (err) {
          console.log('request error: ', err);
        }
        if (res.statusCode !== 200) {
          console.log('res: ', res);
          console.log('bad request: ', res.statusCode);
        }
      };

      request({qs: q, uri: uri, method: 'GET'}, cb);

    } else {
      return console.log("error: missing environment variables");
    }
  }


};

module.exports = Image;
