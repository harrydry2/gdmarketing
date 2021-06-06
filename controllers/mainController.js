/* eslint-disable no-var */
const mongoose = require('mongoose');
const path = require('path');

const Cards = mongoose.model('Cards');
const Gifs = mongoose.model('Gifs');
const GifsMob = mongoose.model('GifsMob');
const Ceg = mongoose.model('Ceg');
const dbCards = require('../scripts/cards');
const dbGifs = require('../scripts/gifs');
const dbGifsMob = require('../scripts/gifsMob');
const dbCeg = require('../scripts/ceg');

let shuffledCeg = [];

function findCommonElements(arr1, arr2) {
  return arr1.some(item => arr2.includes(item));
}

function shuffleFisherYates(array) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

function isMobile(ua) {
  const mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
  return mobileRE.test(ua);
}

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

// exports.podcast = async (req, res) => {
//   res.render('./podcast/ext');
// };

exports.twitterhandbook = async (req, res) => {
  res.render('./twitterhandbook/ext');
};

exports.ce = async (req, res) => {
  shuffledCeg = dbCeg;
  // shuffledCeg = shuffleFisherYates(dbCeg);
  res.render('./ce/ext');
};

exports.copywritingexamples = async (req, res) => {
  // const page = +req.params.page || 1;
  // const limit = 14;
  // const skip = limit * page - limit;
  // const cegs = await Ceg.find()
  //   .skip(skip)
  //   .limit(limit);
  shuffledCeg = shuffleFisherYates(dbCeg);
  // shuffledCeg = dbCeg;
  res.render('./copywritingexamples/ext');
};

exports.course = async (req, res) => {
  var added = false;
  if (req.query.added) {
    console.log(req.query.added);
    added = true;
  }
  res.render('./course/ext', {
    added,
  });
};

exports.bestofsub = async (req, res) => {
  res.render('./bestofsub/ext');
};

exports.bestofunsub = async (req, res) => {
  res.render('./bestofunsub/ext');
};

exports.gifs = async (req, res) => {
  const page = +req.params.page || 1;
  const limit = 8;
  const skip = limit * page - limit;
  if (!isMobile(req.headers['user-agent'])) {
    const gifs = await Gifs.find()
      .skip(skip)
      .limit(limit);
    res.render('./home/gifs', { gifs });
  } else {
    const gifsMob = await GifsMob.find()
      .skip(skip)
      .limit(limit);
    console.log(gifsMob);
    res.render('./home/gifsMob', { gifsMob });
  }
};

exports.xml = async (req, res) => {
  res.contentType('application/xml');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
};

exports.txt = async (req, res) => {
  res.contentType('text/plain');
  res.sendFile(path.join(__dirname, 'robots.txt'));
};

exports.rss = async (req, res) => {
  res.contentType('application/xml');
  res.sendFile(path.join(__dirname, 'marketingexamples.rss'));
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

exports.lazyCeg = async (req, res) => {
  let cegs;
  let nextTen;
  let start;
  let end;
  const { page } = req.params || 1;
  const { filterParam } = req.params;
  if (parseInt(page) === 1) {
    end = 14;
    start = 0;
  } else {
    start = parseInt(page) * 10 + 4 - 10;
    end = parseInt(page) * 10 + 4;
  }
  const pageString = page.toString();
  if (filterParam === 'all') {
    cegs = shuffledCeg.slice(start, end);
    nextTen = shuffledCeg
      .slice(end, end + 10)
      .map(ceg => ceg.code)
      .toString();
  } else {
    const activeFilters = filterParam.split('-');
    const filteredCeg = shuffledCeg.filter(item =>
      findCommonElements(activeFilters, item.filter)
    );
    cegs = filteredCeg.slice(start, end);
  }
  res.render('./backend/cegs', { cegs, pageString, nextTen });
};

// exports.lazyCeg = async (req, res) => {
//   let cegs;
//   let limit;
//   let skip;
//   const { page } = req.params || 1;
//   const { filterParam } = req.params;
//   if (parseInt(page) === 1) {
//     limit = 14;
//     skip = 0;
//   } else {
//     limit = 10;
//     skip = limit * parseInt(page) - limit + 4;
//   }
//   const pageString = page.toString();
//   if (filterParam === 'all') {
//     cegs = await Ceg.find()
//       .skip(skip)
//       .limit(limit);
//   } else {
//     const activeFilters = filterParam.split('-');
//     cegs = await Ceg.find({ filter: { $in: activeFilters } })
//       .skip(skip)
//       .limit(limit);
//   }
//   res.render('./backend/cegs', { cegs, pageString });
// };

exports.lazyGif = async (req, res) => {
  const { page } = req.params || 1;
  const limit = 8;
  const skip = limit * page - limit;
  if (!isMobile(req.headers['user-agent'])) {
    const gifs = await Gifs.find()
      .skip(skip)
      .limit(limit);
    res.render('./backend/gifs', { gifs });
  } else {
    const gifsMob = await GifsMob.find()
      .skip(skip)
      .limit(limit);
    console.log(gifsMob);
    res.render('./backend/gifsMob', { gifsMob });
  }
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

exports.postgifsMob = async (req, res) => {
  await GifsMob.deleteMany({});
  await GifsMob.insertMany(dbGifsMob);
  const gifs = await GifsMob.find();
  res.json(gifs);
};

exports.postceg = async (req, res) => {
  await Ceg.deleteMany({});
  await Ceg.insertMany(dbCeg);
  const ceg = await Ceg.find();
  // const cegshuffled = shuffleFisherYates(ceg);
  res.json(ceg);
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
