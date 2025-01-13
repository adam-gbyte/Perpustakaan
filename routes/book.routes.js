const bookController = require('../controllers/book.controller');

const adminAuth = require('../middlewares/admin-auth')
const auth = require('../middlewares/user-auth')

const express = require('express');
const router = express.Router();

// POST api/books
router.post('/books', adminAuth, bookController.postBook);

// GET api/books?genre=genre dan GET api/books
router.get('/books', auth, bookController.getBooks);

// GET api/books/:id
router.get('/books/:id', auth, bookController.getBooksById);

// PUT api/books/:id
router.put('/books/:id', adminAuth, bookController.updateBook);

// DELETE api/books/:id
router.delete('/books/:id', adminAuth, bookController.deleteBookById);

module.exports = router;