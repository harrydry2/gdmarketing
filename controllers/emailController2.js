const mongoose = require('mongoose');
const axios = require('axios');

const Cards = mongoose.model('Cards');

// course

exports.subscribeCourse = async (req, res) => {
  const { email } = req.body;
  try {
    const posted = await axios.post(
      `https://api.convertkit.com/v3/forms/2080156/subscribe`,
      {
        api_key: process.env.CKAPI,
        email,
        tags: [2221847],
      }
    );
    res.json({ email: 'true' });
  } catch (err) {
    if (err.response.data.error.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      res.json({ email: 'duplicate' });
    } else {
      console.log(err, 'error');
      res.json({ email: 'dunno' });
    }
    console.log(err.response.data.error.code);
  }
};

// regular

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const posted = await axios.post(
      `https://api.convertkit.com/v3/forms/2080121/subscribe`,
      {
        api_key: process.env.CKAPI,
        email,
        tags: [2218623],
      }
    );
    res.json({ email: 'true' });
  } catch (err) {
    if (err.response.data.error.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      res.json({ email: 'duplicate' });
    } else {
      console.log(err, 'error');
      res.json({ email: 'dunno' });
    }
    console.log(err.response.data.error.code);
  }
};

exports.subscribePage = async (req, res) => {
  // get skip + limit
  const page = +req.params.page || 1;
  const limit = 10;
  const skip = limit * page - limit;
  const cards = await Cards.find()
    .skip(skip)
    .limit(limit);
  res.render('./home/extSubscribe', {
    cards,
    subscribePage: 'outerMailActive'
  });
};
