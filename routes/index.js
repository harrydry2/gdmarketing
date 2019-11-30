const express = require('express');

const router = express.Router();
const mainController = require('../controllers/mainController');
const postController = require('../controllers/postController');
const emailController = require('../controllers/emailController');

router.get('/robots.txt', mainController.txt);
router.get('/', mainController.home);
router.get('/gifs', mainController.gifs);
router.get('/sitemap.xml', mainController.xml);
router.get('/marketingexamples.rss', mainController.rss);
// tes
router.get('/subscribe', emailController.subscribePage);
// api

router.get('/api/lazy/:page/:filterParam', mainController.lazy);
router.get('/api/lazyGif/:page', mainController.lazyGif);
router.get('/api/getcontent', mainController.getcontent);
router.get('/api/getpCard', mainController.getpCard);
router.get('/api/postideas', mainController.postideas);
router.get('/api/postgifs', mainController.postgifs);
router.get('/api/postgifsMob', mainController.postgifsMob);
router.post('/api/subscribe', emailController.subscribe);

// posts
router.get('/:filter/:slug', postController.post);

// filters
router.get('/:filters', mainController.filters);

module.exports = router;
