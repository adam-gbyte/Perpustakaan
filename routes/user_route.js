const userController = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById)
router.delete('/users/:id', userController.deleteUserById)

module.exports = router;