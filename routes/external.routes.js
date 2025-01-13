
const externalController = require('../controllers/external.controller');

const adminAuth = require('../middlewares/admin-auth')
const auth = require('../middlewares/user-auth')

const express = require('express');
const router = express.Router();

// GET /api/external?query=name+book
router.get('/external', auth, externalController.searchOpenLibraryBooks);

module.exports = router;