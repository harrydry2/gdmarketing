const express = require("express");

const router = express.Router();
const mainController = require("../controllers/mainController");
const postController = require("../controllers/postController");
// const emailController = require('../controllers/emailController');
const emailController2 = require("../controllers/emailController2");

router.get("/robots.txt", mainController.txt);
router.get("/", mainController.home);
router.get("/gifs", mainController.gifs);
// router.get('/podcast', mainController.podcast);
router.get("/course", mainController.course);
router.get("/inspiration", mainController.fed);
router.get("/sitemap.xml", mainController.xml);
router.get("/rss", mainController.rss);
// tes
router.get("/newsletter", emailController2.subscribePage);
router.get("/best-of/subscribe", mainController.bestofsub);
router.get("/best-of/unsubscribe", mainController.bestofunsub);
// api

router.get("/api/lazy/:page/:filterParam", mainController.lazy);
router.get("/api/lazyceg/:page/:filterParam", mainController.lazyCeg);
router.get("/api/lazyGif/:page", mainController.lazyGif);
router.get("/api/getcontent", mainController.getcontent);
router.get("/api/getpCard", mainController.getpCard);
router.get("/api/postideas", mainController.postideas);
router.get("/api/testideas", mainController.testideas);
router.get("/api/postgifs", mainController.postgifs);
router.get("/api/postgifsMob", mainController.postgifsMob);
router.get("/api/postceg", mainController.postceg);
router.post("/api/subscribe", emailController2.subscribe);
router.post("/api/subscribeCourse", emailController2.subscribeCourse);

// redirect nation

router.get("/handbook/twitter-inspiration", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/social/twitter-inspiration");
});

router.get("/subscribe", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/newsletter");
});

router.get("/conversion/landing-page-guide", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/landing-page/guide");
});

router.get("/copywriting/rewriting-landing-pages", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/landing-page/rewrites");
});

router.get("/viral/growth-loops", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/referral/growth-loops");
});

router.get("/viral/ladbaby", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/brand/ladbaby");
});

router.get("/viral/lil-nas-x", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/social/lil-nas-x");
});

router.get("/misc/real-marketing", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/brand/real");
});

router.get("/viral/stevenage-challenge", (req, res) => {
  res.redirect(
    301,
    "https://marketingexamples.com/creative/stevenage-challenge"
  );
});

router.get("/giveaway/molly-mae", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/social/molly-mae");
});

router.get("/viral/andrew-schulz", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/content/andrew-schulz");
});

router.get("/seo/press", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/seo/digital-pr");
});

router.get("/sales/dave-gerhardt", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/sales/one-line-email");
});

router.get("/sales/how-nike-sold-first-shoes", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/sales/nikes-first-shoes");
});

router.get("/socialmedia/fast", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/social/fast");
});

router.get("/conversion/ahrefs-social-proof", (req, res) => {
  res.redirect(
    301,
    "https://marketingexamples.com/landing-page/ahrefs-social-proof"
  );
});

router.get("/customers/jurgen-klopp", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/brand/klopp");
});

router.get("/viral/counterpunch", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/social/counterpunch");
});

router.get("/viral/coronavirus-pivots", (req, res) => {
  res.redirect(
    301,
    "https://marketingexamples.com/creative/coronavirus-pivots"
  );
});

router.get("/sales/jason-cohen-sales", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/sales/jason-cohen");
});

router.get("/customers/chewy", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/brand/chewy");
});

router.get("/ppc/creative-google-ad", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/ads/creative-google-ad");
});

router.get("/customers/birthday-cake", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/retention/birthday-cake");
});

router.get("/conversion/email-subscribers", (req, res) => {
  res.redirect(
    301,
    "https://marketingexamples.com/landing-page/email-subscribers"
  );
});

router.get("/brand/no-name-brand", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/brand/no-name");
});

router.get("/ppc/experiments", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/ads/experiments");
});

router.get("/copywriting/landing-page-title", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/landing-page/titles");
});

router.get("/viral/taco-robbery", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/creative/taco-robbery");
});

router.get("/seo/dominate-long-tail-keywords", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/seo/long-tail-keywords");
});

router.get("/misc/refactoring-ui", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/landing-page/pricing");
});

router.get("/conversion/product-hunt", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/social/product-hunt");
});

router.get("/email/indie-hackers-newsletter", (req, res) => {
  res.redirect(
    301,
    "https://marketingexamples.com/retention/email-segmentation"
  );
});

router.get("/referral/tesla-marketing-strategy", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/brand/tesla");
});

router.get("/content/giphy-marketing", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/content/giphy");
});

router.get("/socialmedia/rev-chris-instagram", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/social/rev-chris");
});

router.get("/content/share-content-on-twitter", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/social/share-on-twitter");
});

router.get("/conversion/copywriting", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/copywriting/conversion");
});

router.get("/seo/competitor-comparison", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/seo/comparison-hub");
});

router.get("/seo/specsavers", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/seo/basics");
});

router.get("/referral/cd-baby-confirmation-email", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/brand/cd-baby");
});

router.get("/misc/tom-hanks-podcast", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/creative/podcast-invite");
});

router.get("/socialmedia/iron-neck", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/ads/iron-neck");
});

router.get("/sideproject/tour-de-france", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/content/tour-de-france");
});

router.get("/content/drive-traffic-from-hacker-news", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/content/hacker-news");
});

router.get("/conversion/sign-up-form-converts", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/landing-page/sign-up");
});

router.get("/viral/fortnite-changed-marketing", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/retention/fortnite");
});

router.get("/giveaway/youtube-marketing", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/social/mail-time");
});

router.get("/seo/step-by-step-keyword-research", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/seo/keyword-research");
});

router.get("/conversion/newsletter-signup-flow", (req, res) => {
  res.redirect(
    301,
    "https://marketingexamples.com/retention/newsletter-signup-flow"
  );
});

router.get("/brand/costly-signalling-theory", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/sales/signalling");
});

router.get("/viral/antifragile-brand", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/brand/antifragile");
});

router.get("/viral/piggyback-viral-trends", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/creative/piggybacking");
});

router.get("/referral/design-virality-into-product", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/referral/tweet-photo");
});

router.get("/content/self-promote-on-reddit", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/content/reddit");
});

router.get("/referral/thank-you-cards-promote-business", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/referral/thank-you-cards");
});

router.get("/viral/serve-a-niche-market", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/brand/niche");
});

router.get("/coldemail/advice-emails", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/sales/advice-email");
});

router.get("/coldemail/funny-cold-email", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/sales/funny-email");
});

router.get("/conversion/build-customer-goodwill", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/retention/intercom");
});

router.get("/coldemail/best-sales-email-ever", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/sales/ai-email");
});

router.get("/referral/viral-loops-content-marketing", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/referral/retweet-to-read");
});

router.get("/coldemail/signalling-in-marketing", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/sales/signalling");
});

router.get("/coldemail/write-personalised-cold-emails", (req, res) => {
  res.redirect(301, "https://marketingexamples.com/sales/personalise");
});

// posts
router.get("/:filter/:slug", postController.post);

// filters
router.get("/:filters", mainController.filters);

module.exports = router;
