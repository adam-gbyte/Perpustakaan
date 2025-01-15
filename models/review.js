const db = require('../config/db')

const getReviewByIdReviews = async (id) => {
    const [rows] = await db.query("SELECT * FROM reviews WHERE id = ?", [id]);
    return rows[0]; // Return review jika ditemukan, null jika tidak
};

const deleteReviewById = async (id) => {
    const [result] = await db.query("DELETE FROM reviews WHERE id = ?", [id]);
    return result.affectedRows;
};

// const getReviewById = async (id) => {
//     const query = `
//         SELECT 
//             reviews.id AS review_id,
//             reviews.user_id,
//             reviews.comment,
//             reviews.rating,
//             reviews.created_at,
//             books.id AS book_id,
//             books.title
//         FROM reviews
//         INNER JOIN books ON reviews.book_id = books.id
//         WHERE reviews.id = ?`;

//     try {
//         const [rows] = await db.execute(query, [id]);
//         // return rows[0]; // Mengembalikan review tunggal
//         return rows
//     } catch (error) {
//         throw new Error('Error fetching review: ' + error.message);
//     }
// };

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

    try {
        return rows;
    } catch (error) {
        throw new Error('Error fetching review: ' + error.message);
    }
};

const updateComment = async (id, returnDate) => {
    const query = 'UPDATE reviews SET comment = ? WHERE id = ?';
    try {
        const [result] = await db.execute(query, [returnDate, id]);

        return result;
    } catch (error) {
        throw new Error('Error updating comment: ' + error);
    }
};

// const deleteReviewById = async (id) => {
//     const [result] = await db.query("DELETE FROM reviews WHERE id=?", [id]);
//     return result.affectedRows;
// }

// const deleteReviewById = async (reviewId, userId) => {
//     // Ambil review berdasarkan ID untuk memeriksa pemiliknya
//     const [review] = await db.query("SELECT user_id FROM reviews WHERE id = ?", [reviewId]);
//     console.log('review ID', review)
//     console.log('user ID', userId)

//     if (review[0].user_id !== userId) {
//         // User tidak berhak menghapus review
//         return { success: false, message: "You are not authorized to delete this review" };
//     }

//     // Hapus review jika ID User cocok
//     const [result] = await db.query("DELETE FROM reviews WHERE id = ?", [reviewId]);
//     return { success: true, affectedRows: result.affectedRows };
// };

const postReview = async (data) => {
    console.log('Data review:', data);

    const { user_id, book_id, rating, comment, created_at } = data;

    if (!user_id || !book_id || !comment) {
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
    getReviewByIdReviews,
    postReview,
    getReviewById,
    deleteReviewById,
    updateComment
}