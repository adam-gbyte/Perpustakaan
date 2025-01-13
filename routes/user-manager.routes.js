const userManagerController = require('../controllers/user-manager.controller');

const auth = require('../middlewares/user-auth')

const express = require('express');
const router = express.Router();

// GET api/users
router.get('/users', auth, userManagerController.getAllUsers);

// DELETE api/users/:id
router.delete('/users/:id', auth, userManagerController.deleteUserById);

module.exports = router;