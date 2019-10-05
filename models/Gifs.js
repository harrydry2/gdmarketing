const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const gifsSchema = new mongoose.Schema({
  gif: String,
  id: String,
});

module.exports = mongoose.model('Gifs', gifsSchema);
