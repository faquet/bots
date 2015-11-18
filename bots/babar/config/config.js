
var port = process.env.PORT || 3000;
var db = process.env.MONGOLAB_URI || 'mongodb://localhost/bot_database';

module.exports = {
  port: port,
  db: db,
};