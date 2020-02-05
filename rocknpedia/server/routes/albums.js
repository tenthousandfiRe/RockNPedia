var express = require("express");
var router = express.Router();
const multer = require("multer");

const albumsController = require("../controllers/albumsController.js");

const storage = multer.diskStorage({
  destination: "public/avatars",
  filename: (_req, file, cb) => {
    const extension = file.originalname.slice(
      file.originalname.lastIndexOf(".")
    );
    cb(null, new Date().valueOf() + extension);
  }
});
const upload = multer({ storage }).single("album_image");

router.get("/:band_id/albumes", albumsController.list);
router.post("/:band_id/albumes", upload , albumsController.save);
router.delete('/:band_id/albumes/delete/:album_id', albumsController.delete);

module.exports = router;
