const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersController = require('../controllers/usersController.js');

const storage = multer.diskStorage({
    destination: "public/avatars",
    originalname: (_req, file, cb) => {
      const extension = file.originalname.slice(
        file.originalname.lastIndexOf(".")
      );
      cb(null, file.originalname, extension);
    }
  });
  
  const upload = multer({ storage }).single("avatar");



router.post('/', usersController.save);
router.get('/', usersController.list);
router.post('/auth', usersController.auth);
router.get('/:id', usersController.listId);
router.post('/caca/:id', upload, usersController.update);
router.delete('/:id', usersController.delete);
// router.post('/avatar', upload, usersController.updateAvatar);



module.exports = router;