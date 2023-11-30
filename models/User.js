const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bought: {
    type: String,
  },
  completedVids: {
    type: [String],
    default: [],
  },
  activeVid: {
    type: String,
    default: '1',
  },
});

module.exports = mongoose.model('Users', userSchema);
