const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersController = require('../controllers/usersController.js');

const storage = multer.diskStorage({
    destination: "public/avatars",
    filename: (_req, file, cb) => {
      const extension = file.originalname.slice(
        file.originalname.lastIndexOf(".")
      );
      cb(null, new Date().valueOf() + extension);
    }
  });
  
  const upload = multer({ storage }).single("user_image");



router.post('/', usersController.save);
router.get('/', usersController.list);
router.post('/auth', usersController.auth);
router.get('/:id', usersController.listId);
router.post('/:id', upload, usersController.update);
router.delete('/:id', usersController.delete);
// router.post('/avatar', upload, usersController.updateAvatar);



module.exports = router;