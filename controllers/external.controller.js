const openAPI = require('../config/open-api')
const cache = require('../config/node-cache')

const searchOpenLibraryBooks = async (req, res) => {
    const { query } = req.query

    if (!query) {
        return res.status(400).json({ message: 'parameters is require' })
    }

    if (cache.has(query)) {
        console.log('Fetc data dari cache');
        return res.status(200).json(cache.get(query))
    }

    try {
        const response = await openAPI.get(`/search.json?q=${encodeURIComponent(query)}`)

        const books = response.data
        cache.set(query, books)
        res.status(200).json(books)

    } catch (error) {
        return res.status(500).json({ msg: 'Failed to fetch data from Open Library API' });
    }
}

module.exports = {
    searchOpenLibraryBooks,
};