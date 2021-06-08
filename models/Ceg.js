const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const cegSchema = new mongoose.Schema({
  code: String,
  h: String,
  img: String,
  alt: String,
  website: String,
  tags: [{ code: String, word: String }],
  filter: [String],
  desc: String,
});

module.exports = mongoose.model('Ceg', cegSchema);
