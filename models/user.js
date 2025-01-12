const db = require('../config/db');
const bcrypt = require('bcrypt')

const getUserById = async (id) => {
    const [row] = await db.query("SELECT * FROM users WHERE id=?", id)
    return row
}

const userRegistration = async (data) => {
    console.log('Data diterima:', data);

    const { name, email, password } = data

    if (!name || !email || !password) {
        console.log('Data tidak lengkap:', { name, email, password });
        return ({ msg: 'Data tidak lengkap' })
    }

    try {
        const salt = 10
        const hash = await bcrypt.hash(password, salt)
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?,?,?)',
            [name, email, hash]
        )
        return ({ Id: result.insertId, pass: hash })

    } catch (eror) {
        console.log(eror);
    }
}

const userLogin = async (data) => {
    const { email, password } = data

    if (!email || !password) {
        console.log('Data tidak lengkap:', { email, password });
        return ({ msg: 'Data tidak lengkap' })
    }

    try {
        const [row] = await db.query(
            'SELECT * FROM users WHERE email=?',
            [email]
        )

        if (!row.length) {
            console.log('Email tidak ditemukan');
            return ({ msg: 'Email tidak ditemukan' })
        }

        const user = row[0]
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            console.log('Password tidak cocok');
            return ({ msg: 'Password tidak cocok' })
        } else {
            console.log('Password cocok');
            return user
        }

    } catch (eror) {
        console.log(eror);
    }
}

module.exports = {
    getUserById,
    userRegistration,
    userLogin
}