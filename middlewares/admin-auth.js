const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({ message: 'Unauthorize' })
    }

    jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, user) => {
        if (err) return res.json({ message: "Invalid token" })
        next()
    })
}

module.exports = auth