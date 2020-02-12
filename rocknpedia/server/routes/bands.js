var express = require('express');
var router = express.Router();
const multer = require("multer");

const bandsController = require('../controllers/bandsController.js');
const storage = multer.diskStorage({
    destination: "public/avatars",
    filename: (_req, file, cb) => {
      const extension = file.originalname.slice(
        file.originalname.lastIndexOf(".")
      );
      cb(null, new Date().valueOf() + extension);
    }
  });
  const upload = multer({ storage }).single("band_image");

router.get('/', bandsController.list);
router.post('/', upload, bandsController.save);
router.get('/:band_id', bandsController.getBand);
router.post('/searchByNames/', bandsController.searchBand);
router.delete('/delete/:band_id', bandsController.delete);
router.post('/update/:band_id', upload, bandsController.update);





module.exports = router;