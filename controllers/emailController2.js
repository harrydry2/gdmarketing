const mongoose = require('mongoose');
const axios = require('axios');

// const Cards = mongoose.model("Test");
const Cards = mongoose.model('Cards');

async function tryAndPostToNewsletter(email, res) {
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
}

// course

exports.subscribeCourse = async (req, res) => {
  const { email } = req.body;
  try {
    const posted = await axios.post(
      `https://api.convertkit.com/v3/forms/3359166/subscribe`,
      {
        api_key: process.env.CKAPI,
        email,
        tags: [3169977],
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
    const prePost = await axios.get(
      `https://api.convertkit.com/v3/subscribers?api_secret=${
        process.env.CKAPIS
      }&email_address=${email}`
    );
    if (prePost.data.total_subscribers === 1) {
      const subid = prePost.data.subscribers[0].id;
      try {
        const prePost2 = await axios.get(
          `https://api.convertkit.com/v3/subscribers/${subid}/tags?api_key=${
            process.env.CKAPI
          }`
        );
        const { tags } = prePost2.data;
        const ArrayOfTags = tags.map(tag => tag.id);
        if (ArrayOfTags.includes(2218623 || 2217641)) {
          res.json({ email: 'duplicate' });
        } else {
          tryAndPostToNewsletter(email, res);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      tryAndPostToNewsletter(email, res);
    }
  } catch (err) {
    console.log(err);
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
