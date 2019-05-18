const express = require('express');

const router = express.Router();
const mainController = require('../controllers/mainController');
const postController = require('../controllers/postController');
const emailController = require('../controllers/emailController');

router.get('/', mainController.home);
router.get('/sitemap', mainController.xml);
router.get('/subscribe', emailController.subscribePage);
// api
router.get('/api/lazy/:page/:filterParam', mainController.lazy);
router.get('/api/getcontent', mainController.getcontent);
router.get('/api/getpCard', mainController.getpCard);
router.get('/api/postideas', mainController.postideas);
router.post('/api/subscribe', emailController.subscribe);

// posts
router.get('/:filter/:slug', postController.post);

// filters
router.get('/:filters', mainController.filters);

module.exports = router;
