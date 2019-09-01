const mongoose = require('mongoose');

const Cards = mongoose.model('Cards');

exports.post = async (req, res) => {
  // find specific card
  const { slug, filters } = req.params;
  const card = await Cards.findOne({ slug });
  // find all cards
  const page = req.params.page || 1;
  const limit = 10;
  const skip = limit * page - limit;
  const cards = await Cards.find()
    .skip(skip)
    .limit(limit);
  res.render(`./posts/ext/${slug}`, { card, cards });
};

exports.test = async (req, res) => {
  const slug = 'adam-wathan-pricing';
  const card = await Cards.findOne({ slug });
  // find all cards
  const page = req.params.page || 1;
  const limit = 10;
  const skip = limit * page - limit;
  const cards = await Cards.find()
    .skip(skip)
    .limit(limit);
  res.render(`./posts/ext/test`, { card, cards });
};
