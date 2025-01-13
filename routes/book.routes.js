const bookController = require('../controllers/book.controller');

const auth = require('../middlewares/user-auth')

const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/user-auth')

// POST api/books
router.post('/books', auth, bookController.postBook);

// GET api/books?genre=genre dan GET api/books
router.get('/books', auth, bookController.getBooks);

// GET api/books/:id
router.get('/books/:id', auth, bookController.getBooksById);

// PUT api/books/:id
router.put('/books/:id', auth, bookController.updateBook);

// DELETE api/books/:id
router.delete('/books/:id', auth, bookController.deleteBookById);

module.exports = router;