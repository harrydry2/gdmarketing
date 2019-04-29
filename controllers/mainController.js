const mongoose = require('mongoose');

const Cards = mongoose.model('Cards');
const dbCards = require('../scripts/cards');

exports.home = async (req, res) => {
  const cards = await Cards.find();
  res.render('./home/ext', { cards });
};

exports.getideas = async (req, res) => {
  if (req.query.q === 'all') {
    var cards = await Cards.find();
  } else {
    const activeFilters = req.query.q.split('-');
    var cards = await Cards.find({ tBack: { $in: activeFilters } });
  }
  res.render('./backend/cards', { cards });
};

exports.getcontent = async (req, res) => {
  const { slug } = req.query;
  res.render(`./backend/posts/content/${slug}`);
};

exports.getpCard = async (req, res) => {
  const { slug } = req.query;
  const card = await Cards.findOne({ slug });
  res.render(`./backend/posts/pCard`, { card });
};

exports.postideas = async (req, res) => {
  await Cards.deleteMany({});
  await Cards.insertMany(dbCards);
  const cards = await Cards.find();
  res.json(cards);
};

exports.filters = async (req, res) => {
  const { filters } = req.params;
  const activeFilters = filters.split('-');
  // find active cards
  const cards = await Cards.find({ tBack: { $in: activeFilters } });
  // turn active filters into meta suitable
  const title = activeFilters
    .map(string => string.charAt(0).toUpperCase() + string.slice(1))
    .join(' and ');
  res.render('filters/ext', { cards, title, activeFilters, filters });
};
