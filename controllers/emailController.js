const mongoose = require('mongoose');
const axios = require('axios');

const eoAPI = '8c233156-83ca-11e9-9307-06b4694bee2a';

const EmailsNum = mongoose.model('EmailsNum');
const Cards = mongoose.model('Cards');

// exports.subscribe = async (req, res) => {
//   const email = await new Emails(req.body).save();
//   res.json({ fuck: 'fuck' });
// };

exports.subscribe = async (req, res) => {
  const { email, num } = req.body;
  console.log(num, 'done');
  try {
    const posted = await axios.post(
      `https://emailoctopus.com/api/1.5/lists/${process.env.EOLIST}/contacts`,
      {
        api_key: process.env.EOAPI,
        email_address: email,
        status: 'SUBSCRIBED'
      }
    );
    if (num === 1) {
      await EmailsNum.updateOne({ id: 10000 }, { $inc: { num1: 1 } });
    } else if (num === 2) {
      await EmailsNum.updateOne({ id: 10000 }, { $inc: { num2: 1 } });
    } else if (num === 3) {
      await EmailsNum.updateOne({ id: 10000 }, { $inc: { num3: 1 } });
    } else if (num === 4) {
      await EmailsNum.updateOne({ id: 10000 }, { $inc: { num4: 1 } });
    } else if (num === 5) {
      await EmailsNum.updateOne({ id: 10000 }, { $inc: { num5: 1 } });
    }
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
    subscribePage: 'outerMailActive',
  });
};
