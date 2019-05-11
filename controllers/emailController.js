const mongoose = require('mongoose');

const Emails = mongoose.model('Emails');
const Cards = mongoose.model('Cards');

exports.subscribe = async (req, res) => {
  const email = await new Emails(req.body).save();
  res.json({ fuck: 'fuck' });
};

exports.subscribePage = async (req, res) => {
  // get skip + limit
  const page = +req.params.page || 1;
  const limit = 10;
  const skip = limit * page - limit;
  const cards = await Cards.find()
    .skip(skip)
    .limit(limit);
  res.render('./home/ext', { cards, subscribePage: 'outerMailActive' });
};
