const userModel = require('../models/user_model');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers()
        if (!users) {
            return res.status(404).json({ message: 'Users not found' })
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const student =
            await userModel.getUserById(req.params.id)
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

const deleteUserById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedCount = await userModel.deleteUserById(id)
        if (deletedCount > 0) {
            res.status(200).json({ message: "User deleted successfully" })
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById
}