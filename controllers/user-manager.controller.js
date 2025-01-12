const userManagerController = require('../models/user-manager');

const getAllUsers = async (req, res) => {
    try {
        const users = await userManagerController.getAllUsers()
        if (!users) {
            return res.status(404).json({ message: 'Users not found' })
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteUserById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedCount = await userManagerController.deleteUserById(id)
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
    deleteUserById
}