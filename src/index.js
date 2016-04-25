require('babel-register')({})

module.exports.credentials = {
  googleCseId: process.env.BOT_GOOGLE_IMAGE_SEARCH_ID,
  googleApiKey: process.env.BOT_GOOGLE_IMAGE_SEARCH_SERVER_KEY,
};

// Rx
require('./server')

// Events
module.exports.hold = require('./lib/wololo');