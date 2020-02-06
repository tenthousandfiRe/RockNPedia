var express = require('express');
var router = express.Router();

const likesController = require('../controllers/likesController.js');

router.post('/user_likes/:band_id/:user_id', likesController.like);
router.get('/user_likes/:band_id/:user_id', likesController.get);
router.delete('/user_unlikes/:band_id/:user_id', likesController.unlike);
router.get('/user_likes/:user_id', likesController.getBands);




module.exports = router;