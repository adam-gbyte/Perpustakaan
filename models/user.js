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

        if (result[0].id === 1) {
            console.log(`Sesepuh admin ${result[0].name} lagi login`);
            const isAdminLogin = bcrypt.compare(password, result[0].password)

            if (isAdminLogin) {
                const payload = {
                    id: result[0].id,
                    name: result[0].name,
                    email: result[0].email
                }

                const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET, { expiresIn: '1h' })

                console.log('Token admin:', token);

                return {
                    id: result[0].id,
                    name: result[0].name,
                    token: token
                }
            }
        }

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