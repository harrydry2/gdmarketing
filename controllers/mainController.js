const mongoose = require('mongoose');

const Cards = mongoose.model('Cards');

exports.home = async (req, res) => {
  const cards = await Cards.find();
  res.render('home', { cards });
};

exports.getideas = async (req, res) => {
  const activeFilters = req.query.q.split('-');
  const cards = await Cards.find({ tag: { $in: activeFilters } });
  res.render('./backend/cards', { cards });
};

exports.postideas = async (req, res) => {
  const cardsList = await Cards.find();
  res.json(cardsList);
};

exports.catchem = async (req, res) => {
  const { url } = req.params;
  console.log(url);
  const activeFilters = url.split('-');
  // get rid of marketing-examples
  activeFilters.splice(activeFilters.length - 2, 2);
  // find active cards
  const cards = await Cards.find({ tag: { $in: activeFilters } });
  // turn active filters into meta suitable
  const title = activeFilters
    .map(string => string.charAt(0).toUpperCase() + string.slice(1))
    .join(' and ');
  res.render('catchem', { cards, title, activeFilters, url });
};
