const bookController = require('../controllers/book.controller');

const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/user-auth')

// POST api/books
router.post('/books', bookController.postBook);

// GET api/books?genre=genre dan GET api/books
router.get('/books', bookController.getBooks);

// GET api/books/:id
router.get('/books/:id', userAuth, bookController.getBooksById);

// PUT api/books/:id
router.put('/books/:id', userAuth, bookController.updateBook);

// DELETE api/books/:id
router.delete('/books/:id', userAuth, bookController.deleteBookById);

module.exports = router;