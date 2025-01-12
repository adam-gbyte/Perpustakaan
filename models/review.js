const db = require('../config/db')

const getReviewById = async (bookId) => {
    const [rows] = await db.query(
        `SELECT 
            books.id AS book_id,
            books.title,
            books.author,
            books.genre,
            books.published_date,
            reviews.id AS review_id,
            reviews.user_id,
            reviews.rating,
            reviews.comment,
            reviews.created_at
         FROM books
         LEFT JOIN reviews ON books.id = reviews.book_id
         WHERE books.id = ?`,
        [bookId]
    );

    console.log(bookId);
    console.log(rows);

    return rows;
};

const updateComment = async (id, returnDate) => {
    const query = 'UPDATE reviews SET comment = ? WHERE id = ?';
    try {
        const [result] = await db.execute(query, [returnDate, id]);
        return result;
    } catch (error) {
        throw new Error('Error updating comment: ' + error.message);
    }
};

const deleteReviewById = async (id) => {
    const [result] = await db.query("DELETE FROM reviews WHERE id=?", [id]);
    return result.affectedRows;
}

const postReview = async (data) => {
    console.log('Data diterima:', data);

    const { user_id, book_id, rating, comment, created_at } = data;

    if (!user_id || !book_id || !comment || !created_at) {
        console.log('Data tidak lengkap:', { user_id, book_id, comment, created_at });
        return ({ msg: 'Data tidak lengkap' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO reviews (user_id, book_id, rating, comment, created_at) VALUES (?, ?, ?, ?, ?)',
            [user_id, book_id, rating, comment, created_at]
        );
        return ({ Id: result.insertId });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postReview,
    getReviewById,
    deleteReviewById,
    updateComment
}