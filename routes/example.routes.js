const exampleController = require('../controllers/example.controller');
const express = require('express');
const router = express.Router();

// GET /example
router.get('/example', exampleController.helloWorld);

module.exports = router;