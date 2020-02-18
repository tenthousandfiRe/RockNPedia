var express = require('express');
var router = express.Router();
const multer = require("multer");

const followController = require('../controllers/followController.js');



router.post('/followers/:user_id/:follow_id', followController.add);
router.get('/followers/:user_id', followController.get);
router.get('/followers/:user_id', followController.getFollows);
router.delete('/followers/delete/:user_id/:follow_id', followController.unfollow);






module.exports = router;