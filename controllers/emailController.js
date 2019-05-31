const mongoose = require('mongoose');
const axios = require('axios');

const eoAPI = '8c233156-83ca-11e9-9307-06b4694bee2a';

const Emails = mongoose.model('Emails');
const Cards = mongoose.model('Cards');

// exports.subscribe = async (req, res) => {
//   const email = await new Emails(req.body).save();
//   res.json({ fuck: 'fuck' });
// };

exports.subscribe = async (req, res) => {
  try {
    const posted = await axios.post(
      `https://emailoctopus.com/api/1.5/lists/${process.env.EOLIST}/contacts`,
      {
        api_key: process.env.EOAPI,
        email_address: req.body.email,
        status: 'SUBSCRIBED',
      }
    );
    res.json({ email: 'true' });
  } catch (err) {
    if (err.response.data.error.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      res.json({ email: 'duplicate' });
    } else {
      res.json({ email: 'dunno' });
    }
    console.log(err.response.data.error.code);
  }
};

exports.get = async (req, res) => {
  const emails = await Emails.find();
  const single = emails.map(email => email.email);
  console.log(single);
  res.json({ single });
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
