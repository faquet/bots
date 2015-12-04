'use strict';
module.exports.credentials = {
  googleCseId: process.env.BOT_GOOGLE_IMAGE_SEARCH_ID,
  googleApiKey: process.env.BOT_GOOGLE_IMAGE_SEARCH_SERVER_KEY,
};

module.exports.turn = require('./slackbot');
module.exports.hold = require('./lib/wololo');