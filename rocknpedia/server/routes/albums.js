var express = require('express');
var router = express.Router();
const multer = require("multer");

const albumsController = require('../controllers/albumsController.js');

// const storage = multer.diskStorage({ // TODO
//     destination: "public/avatars",
//     filename: (_req, file, cb) => {
//       const extension = file.originalname.slice(
//         file.originalname.lastIndexOf(".")
//       );
//       cb(null, new Date().valueOf() + extension);
//     }
//   });
//   const upload = multer({ storage }).single("band_image");

router.get('/:band_id/albums', albumsController.list);
router.post('/:band_id/albums', albumsController.save);






module.exports = router;