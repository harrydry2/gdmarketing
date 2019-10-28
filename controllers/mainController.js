const mongoose = require('mongoose');
const path = require('path');

const Cards = mongoose.model('Cards');
const Gifs = mongoose.model('Gifs');
const dbCards = require('../scripts/cards');
const dbGifs = require('../scripts/gifs');

exports.home = async (req, res) => {
  // get skip + limit
  const page = +req.params.page || 1;
  const limit = 8;
  const skip = limit * page - limit;
  const cards = await Cards.find()
    .skip(skip)
    .limit(limit);
  res.render('./home/ext', { cards });
};

exports.gifs = async (req, res) => {
  const page = +req.params.page || 1;
  const limit = 10;
  const skip = limit * page - limit;
  const gifs = await Gifs.find()
    .skip(skip)
    .limit(limit);
  res.render('./home/gifs', { gifs });
};

exports.xml = async (req, res) => {
  res.contentType('application/xml');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
};

exports.txt = async (req, res) => {
  res.contentType('text/plain');
  res.sendFile(path.join(__dirname, 'robots.txt'));
};

exports.lazy = async (req, res) => {
  let cards;
  const { page } = req.params || 1;
  const { filterParam } = req.params;
  const limit = 8;
  const skip = limit * page - limit;
  if (filterParam === 'all') {
    cards = await Cards.find()
      .skip(skip)
      .limit(limit);
  } else {
    const activeFilters = filterParam.split('-');
    cards = await Cards.find({ tBack: { $in: activeFilters } })
      .skip(skip)
      .limit(limit);
  }
  res.render('./backend/cards', { cards });
};

exports.lazyGif = async (req, res) => {
  const { page } = req.params || 1;
  const limit = 10;
  console.log(page, 'end');
  const skip = limit * page - limit;
  const gifs = await Gifs.find()
    .skip(skip)
    .limit(limit);
  res.render('./backend/gifs', { gifs });
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

exports.postgifs = async (req, res) => {
  await Gifs.deleteMany({});
  await Gifs.insertMany(dbGifs);
  const gifs = await Gifs.find();
  res.json(gifs);
};

exports.filters = async (req, res) => {
  const { filters } = req.params;
  const activeFilters = filters.split('-');
  const page = req.params.page || 1;
  const limit = 8;
  const skip = limit * page - limit;
  // find active cards
  const cards = await Cards.find({ tBack: { $in: activeFilters } })
    .skip(skip)
    .limit(limit);
  // turn active filters into meta suitable
  let title = activeFilters
    .map(string => string.charAt(0).toUpperCase() + string.slice(1))
    .join(' and ');
  // edge case for two word filters
  if (title.includes('Coldemail')) {
    title = title.replace('Coldemail', 'Cold Email');
  }
  res.render('filters/ext', { cards, title, activeFilters, filters });
};
