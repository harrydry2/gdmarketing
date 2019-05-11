const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
  },
});

module.exports = mongoose.model('Emails', emailSchema);
