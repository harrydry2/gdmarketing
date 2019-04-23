const express = require('express');

const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/api/getideas', mainController.getideas);
router.get('/api/postideas', mainController.postideas);

// cartch all filter
router.get('/:url', mainController.catchem);

module.exports = router;
