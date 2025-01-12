const validApiKey = '123'

const userAuth = (req, res, next) => {
    // const apiKey = '123'
    const apiKey = req.headers['x-api-key']

    if (!apiKey) {
        res.status(400).json({ message: 'Access Denied' })
        return
    }

    if (apiKey != validApiKey) {
        res.status(400).json({ message: 'Invalid API key' })
        return
    }

    next()
}

module.exports = userAuth
