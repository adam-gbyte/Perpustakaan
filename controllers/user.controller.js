const userModel = require('../models/user');

const getUserById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id)
        if (user.length > 0) {
            res.status(200).json({ message: 'Sukses', user })
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
            
            return res.status(200).json({
                id: add.Id,
                name: data.name,
                email: data.email,
                hash: add.pass,
                phone: data.phone
            })
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
            return res.status(200).json({ message:'Login success', login })
        }
        return res.status(400).send({ msg: 'Login Failed' })

    } catch (eror) {
        console.log(eror);
    }
}

module.exports = {
    getUserById,
    userRegistration,
    userLogin
}