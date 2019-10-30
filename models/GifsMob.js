const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const gifsMobSchema = new mongoose.Schema({
  gif: String,
  id: String,
});

module.exports = mongoose.model('GifsMob', gifsMobSchema);
