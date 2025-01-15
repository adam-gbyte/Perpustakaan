const db = require('../config/db')

const getAllLoans = async () => {
    try {
        const [loans] = await db.query('SELECT * FROM loans');
        return loans;
    } catch (error) {
        console.log(error);
    }
}

const getLoansByIdUser = async (userId) => {
    try {
        const [rows] = await db.query(
            `SELECT 
            users.id AS user_id,
            users.name,
            users.email,
            users.phone,
            loans.id AS loan_id,
            loans.user_id,
            loans.book_id,
            loans.loan_date,
            loans.return_date
         FROM users
         LEFT JOIN loans ON users.id = loans.user_id
         WHERE users.id = ?`,
            [userId]
        );

        return rows;
    } catch (error) {
        console.log(error);
    }
}

const updateReturnDate = async (id, returnDate) => {
    const query = 'UPDATE loans SET return_date = ? WHERE id = ?';
    try {
        const [result] = await db.execute(query, [returnDate, id]);
        return result;
    } catch (error) {
        throw new Error('Error updating return_date: ' + error.message);
    }
};

const postLoans = async (data) => {
    console.log('Data diterima:', data);

    const { user_id, book_id } = data;

    if (!user_id || !book_id ) {
        console.log('Data tidak lengkap:', { user_id, book_id });
        return ({ msg: 'Data tidak lengkap' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO loans (user_id, book_id) VALUES (?,?)',
            [user_id, book_id]
        );
        return ({ Id: result.insertId });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllLoans,
    postLoans,
    getLoansByIdUser,
    updateReturnDate
}