const mongoose = require('mongoose');

const Cards = mongoose.model('Cards');

exports.post = async (req, res) => {
  // find specific card
  const { slug } = req.params;
  const card = await Cards.findOne({ slug });
  // find all cards
  const cards = await Cards.find();
  res.render(`./posts/ext/${slug}`, { card, cards });
};
