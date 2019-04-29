const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const cardsSchema = new mongoose.Schema({
  num: String,
  title: String,
  sUrl: String,
  sText: String,
  tFront: String,
  tBack: String,
  slug: String,
  img: String,
  desc: String,
});

module.exports = mongoose.model('Cards', cardsSchema);
