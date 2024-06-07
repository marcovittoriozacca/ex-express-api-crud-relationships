const express = require('express');

const { store, index, show, update, destroy } = require('../controllers/tags.js');

const router = express.Router();

router.get('/', index);

router.post('/', store);

router.get('/:id', show);

router.put('/:id', update);

router.delete('/:id', destroy);

module.exports = router;