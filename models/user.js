const db = require('../config/db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

// const userLogin = async (data) => {
//     const { email, password } = data;

//     if (!email || !password) {
//         console.log('Data tidak lengkap:', { email, password });
//         return { status: 'error', msg: 'Data tidak lengkap' };
//     }

//     try {
//         const [rows] = await db.query(
//             'SELECT * FROM users WHERE email = ?',
//             [email]
//         );

//         if (!rows.length) {
//             console.log('Email tidak ditemukan');
//             return { status: 'error', msg: 'Email tidak ditemukan' };
//         }

//         const user = rows[0];

//         const match = await bcrypt.compare(password, user.password);

//         if (!match) {
//             console.log('Password tidak cocok');
//             return { status: 'error', msg: 'Password tidak cocok' };
//         }

//         return user
//     } catch (error) {
//         console.error('Error saat login:', error);
//         return { status: 'error', msg: 'Terjadi kesalahan saat login', error: error.message };
//     }
// };

const userLogin = async (data) => {
    const { email, password } = data

    if (!email || !password) {
        return { error: 'Email and password is required' }
    }

    try {
        const [result] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if (result) {
            const isLogin = bcrypt.compare(password, result[0].password)
            if (isLogin) {
                const payload = {
                    id: result[0].id,
                    name: result[0].name,
                    email: result[0].email
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
                return {
                    id: result[0].id,
                    name: result[0].name,
                    token: token
                }
            }
            return ({ message: 'invalid password' })
        }
        return ({ message: 'invalid email' })
    } catch (eror) {
        console.log(eror);
    }
}

module.exports = {
    getUserById,
    userRegistration,
    userLogin
}