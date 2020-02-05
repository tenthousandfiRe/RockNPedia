var express = require('express');
var router = express.Router();
const multer = require("multer");

const reviewsController = require('../controllers/reviewsController.js');

router.get('/:review_id', reviewsController.list);
router.post('/', reviewsController.save);
router.post('/update/:review_id', reviewsController.update);


module.exports = router;