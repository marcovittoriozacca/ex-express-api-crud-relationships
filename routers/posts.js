const express = require('express');
const router = express.Router();
const { store, show, index, update, destroy } = require('../controllers/posts.js');
const { passedBody } = require('../validations/posts_schema.js');
const validator = require('../middlewares/validator.js');


router.post('/', validator(passedBody) ,store);

router.get('/', index);
router.get('/:slug', show);

router.put('/:slug', update);

router.delete('/:slug', destroy);

module.exports = router;