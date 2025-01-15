const db = require('../config/db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUserById = async (id) => {
    const [row] = await db.query("SELECT * FROM users WHERE id=?", id)
    return row
}

const userRegistration = async (data) => {
    const { name, email, password, phone} = data

    if (!name || !email || !password || !phone) {
        console.log('Data tidak lengkap:', { name, email, password, phone});
        return ({ msg: 'Data tidak lengkap' })
    }

    try {
        const salt = 10
        const hash = await bcrypt.hash(password, salt)
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
            [name, email, hash, phone]
        )
        
        return ({ Id: result.insertId, pass: hash })

    } catch (eror) {
        console.log(eror);
    }
}

const userLogin = async (data) => {
    const { email, password } = data;

    console.log(data);

    if (!email || !password) {
        return { error: 'Email and password is required' };
    }

    try {
        const [result] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (result.length === 0) {
            return { message: 'invalid email' };
        }

        const user = result[0];
        console.log(user);

        if (user.id === 1) {
            console.log(`Admin ${user.name} sedang login`);
            const isAdminLogin = await bcrypt.compare(password, user.password);

            if (isAdminLogin) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };

                const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET, {
                    expiresIn: '6h',
                });

                return {
                    id: user.id,
                    name: user.name,
                    token_admin: token,
                };
            } else {
                return { message: 'invalid password' };
            }
        }

        console.log('Login sebagai', user.name);
        const isUserLogin = await bcrypt.compare(password, user.password);

        if (isUserLogin) {
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '6h',
            });

            return {
                id: user.id,
                name: user.name,
                token_user: token,
            };
        } else {
            return { message: 'invalid password' };
        }
    } catch (error) {
        console.error('Error saat login:', error);
        return { error: 'An error occurred during login' };
    }
};

module.exports = {
    getUserById,
    userRegistration,
    userLogin
}