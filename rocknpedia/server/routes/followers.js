var express = require('express');
var router = express.Router();
const multer = require("multer");

const followController = require('../controllers/followController.js');



router.post('/followers/:user_id/:follow_id', followController.add);
router.get('/followers/:user_id', followController.get);
router.delete('/followers/delete/:follow_id', followController.unfollow);






module.exports = router;