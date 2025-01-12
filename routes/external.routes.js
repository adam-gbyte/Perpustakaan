const express = require('express');
const router = express.Router();
const externalController = require('../controllers/external.controller');

// GET /api/external?query=name+book
router.get('/external', externalController.searchOpenLibraryBooks);

module.exports = router;