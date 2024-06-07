const express = require('express');
const { index } = require('../controllers/categories.js');
const router = express.Router();

router.get('/', index);


module.exports = router;