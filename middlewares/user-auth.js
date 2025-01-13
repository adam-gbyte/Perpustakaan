const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, admin) => {
        if (!err && admin) {
            req.user = admin;
            return next();
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = user;
            return next();
        });
    });
};

module.exports = auth