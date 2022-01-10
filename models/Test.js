const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const testSchema = new mongoose.Schema({
  num: String,
  title: String,
  sUrl: String,
  sText: String,
  tFront: String,
  tBack: String,
  slug: String,
  img: String,
  imgType: String,
  desc: String,
});

module.exports = mongoose.model('Test', testSchema);
