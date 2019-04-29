const express = require('express');

const router = express.Router();
const mainController = require('../controllers/mainController');
const postController = require('../controllers/postController');
const emailController = require('../controllers/emailController');

router.get('/', mainController.home);

// api
router.get('/api/getideas', mainController.getideas);
router.get('/api/getcontent', mainController.getcontent);
router.get('/api/getpCard', mainController.getpCard);
router.get('/api/postideas', mainController.postideas);
router.post('/api/subscribe', emailController.subscribe);

// filters
router.get('/marketing-examples/:filters', mainController.filters);

// posts
router.get('/:slug', postController.post);

module.exports = router;
