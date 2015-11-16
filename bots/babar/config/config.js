// if (!process.env.PORT) {
//   env = require('node-env-file');
//   env('.env');
// }

var port = process.env.PORT || 3000;
var db = process.env.MONGOLAB_URI || 'mongodb://localhost/bot_database';

module.exports = {
  port: port,
  db: db,
};