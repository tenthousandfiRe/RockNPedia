var express = require('express');
var router = express.Router();
const multer = require("multer");

const reviewsController = require('../controllers/reviewsController.js');

router.get('/:album_id', reviewsController.list);
router.get('/user_reviews/:user_id', reviewsController.list2);
router.post('/:user_id/:album_id', reviewsController.save);
// router.post('/update/:review_id', reviewsController.update); TODO if possible


module.exports = router;