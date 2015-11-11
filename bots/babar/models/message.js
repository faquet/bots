var mongoose = require('mongoose');

var Message = new mongoose.Schema({
  message: String,
  user: String,
  timestamp: {
      type: Date,
      default: Date.now
  },
});

module.exports = mongoose.model( 'Message', Message );