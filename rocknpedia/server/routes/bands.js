var express = require('express');
var router = express.Router();

const bandsController = require('../controllers/bandsController.js');

router.get('/', bandsController.list);
router.post('/', bandsController.save);
router.delete('/:band_id', bandsController.delete);




module.exports = router;