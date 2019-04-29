const mongoose = require('mongoose');

const Emails = mongoose.model('Emails');

exports.subscribe = async (req, res) => {
  const email = await new Emails(req.body).save();
  res.json({ fuck: 'fuck' });
};
