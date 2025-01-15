const db = require('../config/db');

const getAllBooks = async () => {
    try {
        const [books] = await db.query('SELECT * FROM books');
        return books;
    } catch (error) {
        console.log(error);
    }
}

const getBooksById = async (id) => {
    try {
        const [books] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
        return books;
    } catch (error) {
        console.log(error);
    }
}

const postBook = async (data) => {
    console.log('Data diterima:', data);

    const { title, author, genre, published_date } = data;

    if (!title || !author || !genre || !published_date) {
        console.log('Data tidak lengkap:', { title, author, genre, published_date });
        return ({ msg: 'Data tidak lengkap' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO books (title, author, genre, published_date) VALUES (?,?,?,?)',
            [title, author, genre, published_date]
        );
        return ({ Id: result.insertId });
    } catch (error) {
        console.log(error);
    }
}

const updateBookById = async (id, data) => {
    console.log('Data diterima:', data);

    const { title, author, genre } = data;

    if (!title || !author || !genre) {
        console.log('Data tidak lengkap:', { title, author, genre });
        return ({ msg: 'Data tidak lengkap' });
    }

    try {
        const [result] = await db.query(
            'UPDATE books SET title=?, author=?, genre=? WHERE id=?',
            [title, author, genre, id]
        );
        return ({ msg: 'Data berhasil diubah' });
    } catch (error) {
        console.log(error);
    }
}

const getBooksByGenre = async (genre) => {
    try {
        const query = 'SELECT * FROM books WHERE genre = ?';
        const [books] = await db.query(query, [genre]);
        return books;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteBookById = async (id) => {
    const [result] = await db.query("DELETE FROM books WHERE id=?", [id]);
    return result.affectedRows;
}

module.exports = {
    getAllBooks,
    getBooksById,
    postBook,
    deleteBookById,
    updateBookById,
    getBooksByGenre
}