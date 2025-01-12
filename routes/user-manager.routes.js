const userManagerController = require('../controllers/user-manager.controller');
const express = require('express');
const router = express.Router();

// GET api/users
router.get('/users', userManagerController.getAllUsers);

// DELETE api/users/:id
router.delete('/users/:id', userManagerController.deleteUserById);

module.exports = router;