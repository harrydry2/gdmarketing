const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const emailNumSchema = new mongoose.Schema({
  id: { type: Number, default: 10000 },
  num1: { type: Number, default: 0 },
  num2: { type: Number, default: 0 },
  num3: { type: Number, default: 0 },
  num4: { type: Number, default: 0 },
});

module.exports = mongoose.model('EmailsNum', emailNumSchema);
