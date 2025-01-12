const db = require('../config/db');

const getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users')
    return rows
}

const deleteUserById = async (id) => {
    const [result] = await db.query("DELETE FROM users WHERE id=?", [id]);
    return result.affectedRows;
}

module.exports = {
    getAllUsers,
    deleteUserById
}