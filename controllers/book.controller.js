const bookModel = require('../models/book');

const getBooks = async (req, res) => {
    const { genre } = req.query;

    try {
        if (genre) {
            const books = await bookModel.getBooksByGenre(genre);
            if (books && books.length > 0) {
                return res.status(200).json(books);
            }
            return res.status(404).json({ msg: 'No books found for the specified genre' });
        }

        const books = await bookModel.getAllBooks();
        if (books) {
            return res.status(200).json(books);
        }
        return res.status(404).json({ msg: 'Books not found' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'An error occurred while retrieving books' });
    }
};

const getBooksById = async (req, res) => {
    try {
        const book = await bookModel.getBooksById(req.params.id);
        if (book.length > 0) {
            res.status(200).json({ message: 'Sukses', book });
        }
        else {
            res.status(500).json({ message: 'Book Not Found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error Get Book' });
    }
}

const postBook = async (req, res) => {
    const data = req.body

    try {
        const add = await bookModel.postBook(data)
        if (add) {
            return res.status(200).json({ message: 'Book add successfully' })
        }
        return res.status(400).send({ msg: 'Add book Failed' })

    } catch (eror) {
        console.log(eror);
    }
}

const updateBook = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const update = await bookModel.updateBookById(id, data)
        if (update) {
            return res.status(200).json({ message: 'Book updated successfully' })
        }
        return res.status(400).send({ msg: 'Update book failed' })

    } catch (eror) {
        console.log(eror);
    }
}

const deleteBookById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedCount = await bookModel.deleteBookById(id)
        if (deletedCount > 0) {
            res.status(200).json({ message: "Book deleted successfully" })
        } else {
            res.status(404).json({ message: "Book not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getBooks,
    getBooksById,
    postBook,
    updateBook,
    deleteBookById
};