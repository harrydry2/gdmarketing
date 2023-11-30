/* eslint-disable no-var */
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(
  'sk_test_51MpK4GDCQDrt6ruz7GkAMy1VG4WUqe5ugmQkmkkVXQw7BndXgTzPsN7YwGJmWWRVddiFpHQQLUezmoM84Zclmkus00euUF3rSL'
);
const path = require('path');
const dbcourseVids = require('../scripts/courseVids');

// app.use(cookieParser());

const Users = mongoose.model('Users');

const createToken = id => jwt.sign({ id }, 'hd', { expiresIn: '3d' });

exports.course9 = async (req, res) => {
  console.log(req.query);
  res.render('./course9/ext', {});
};

exports.course10 = async (req, res) => {
  try {
    // new user check
    if (req.query.session_id) {
      const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
      );
      const { email } = session.customer_details;
      const { payment_link } = session;
      const user = new Users({ email, bought: payment_link });
      await user.save();
      // auth user
      // cookis and json web token
      // send email with course details :)
    }
    res.render('./course10/ext', {
      matchingSlug: {
        id: 1,
        title: 'Six hours in London',
        slug: 'six-hours-in-london',
        vidid: 888258161,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.coursePage = async (req, res) => {
  const { slug } = req.params;
  const matchingSlug = dbcourseVids.find(obj => obj.slug === slug);
  console.log(matchingSlug, 'sq');
  res.render('./course10/ext', {
    matchingSlug,
  });
};

exports.createCheckout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url:
      'http://localhost:7777/course10?session_id={CHECKOUT_SESSION_ID}',
    line_items: [{ price: 'price_1OHBPLDCQDrt6ruzj0SWnslN', quantity: 1 }],
    mode: 'payment'
  });
  console.log(session, 'che');
  res.redirect(session.url);
};
