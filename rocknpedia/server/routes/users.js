const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');


router.post('/', usersController.save);
router.get('/', usersController.list);
router.post('/auth', usersController.auth);
router.get('/:id', usersController.listId);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);




module.exports = router;