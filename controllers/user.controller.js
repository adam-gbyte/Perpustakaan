const userModel = require('../models/user');

const getUserById = async (req, res) => {
    try {
        const student = await userModel.getUserById(req.params.id)
        if (student.length > 0) {
            res.status(200).json({ message: 'Sukses', student })
        }
        else {
            res.status(500).json({ message: 'User Not Found' })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error Get User' })
    }
}

const userRegistration = async (req, res) => {
    const data = req.body

    try {
        const add = await userModel.userRegistration(data)
        if (add) {
            return res.status(200).json({ data })
            // return res.status(200).json({ id: add.id, hash: add.pass })
        }

        return res.status(400).send({ msg: 'Registration Failed' })
    } catch (eror) {
        console.log(eror);
    }
}

const userLogin = async (req, res) => {
    const data = req.body

    try {
        const login = await userModel.userLogin(data)
        if (login) {
            console.log('Email dan Password', data);
            console.log('Login sebagai', login.name);

            return res.status(200).json({ login })
            // return res.status(200).json({ id: login.id, hash: login.pass })
        }
        return res.status(400).send({ msg: 'Login Failed' })

    } catch (eror) {
        console.log('eror');
        console.log(eror);
    }
}

module.exports = {
    getUserById,
    userRegistration,
    userLogin
}