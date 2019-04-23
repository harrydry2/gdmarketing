const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const cardsSchema = new mongoose.Schema({
  num: {
    type: String,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  link: {
    type: String,
  },
  tag: {
    type: String,
  },
});

module.exports = mongoose.model('Cards', cardsSchema);
