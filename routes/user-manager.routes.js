const userManagerController = require('../controllers/user-manager.controller');

const adminAuth = require('../middlewares/admin-auth')

const express = require('express');
const router = express.Router();

// GET api/users
router.get('/users', adminAuth, userManagerController.getAllUsers);

// DELETE api/users/:id
router.delete('/users/:id', adminAuth, userManagerController.deleteUserById);

module.exports = router;