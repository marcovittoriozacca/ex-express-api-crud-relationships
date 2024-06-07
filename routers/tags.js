const express = require('express');

const { store } = require('../controllers/tags.js');

const router = express.Router();


router.post('/', store);

module.exports = router;