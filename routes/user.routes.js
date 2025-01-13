const userController = require('../controllers/user.controller');

const auth = require('../middlewares/user-auth')

const express = require('express');
const router = express.Router();

// GET api/users/:id
router.get('/users/:id', auth, userController.getUserById);

// POST api/auth/register
router.post('/auth/register', userController.userRegistration);

// POST api/auth/login
router.post('/auth/login', userController.userLogin);

module.exports = router;