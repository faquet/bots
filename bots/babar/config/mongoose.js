var store = require('./store'),
    mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(store.db);

  require('../models/message');

  return db;
};