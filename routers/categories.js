const express = require('express');
const { index, store, show, update, destroy } = require('../controllers/categories.js');
const categoriesVal = require('../validations/categories_schema.js');
const { categoriesId } = require('../validations/generals.js');
const validator = require('../middlewares/validator.js');
const router = express.Router();

router.use('/:id', validator(categoriesId))

router.get('/', index);
router.get('/:id', show);
router.delete('/:id', destroy);


router.use(validator(categoriesVal))
router.post('/', store);
router.put('/:id', update);




module.exports = router;