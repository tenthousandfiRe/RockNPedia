var express = require('express');
var router = express.Router();

const bandsController = require('../controllers/bandsController.js');

router.get('/', bandsController.list);
router.post('/', bandsController.save);
router.get('/:band_id', bandsController.getBand);
router.delete('/delete/:band_id', bandsController.delete);
router.put('/update/:band_id', bandsController.update);





module.exports = router;