const openAPI = require('../config/open-api')
const cache = require('../config/node-cache')
const parseBooks = require('../models/external')

// const searchOpenLibraryBooks = async (req, res) => {
//     const { query } = req.query

//     if (!query) {
//         return res.status(400).json({ message: 'parameters is require' })
//     }

//     if (cache.has(query)) {
//         console.log('Fetc data dari cache');
//         return res.status(200).json(cache.get(query))
//     }

//     try {
//         const response = await openAPI.get(`/search.json?q=${encodeURIComponent(query)}`)

//         const books = response.data.results.map(parseBooks)
//         cache.set(query, books)
//         res.status(200).json(books)

//     } catch (error) {
//         return res.status(500).json({ msg: 'Failed to fetch data from Open Library API' });
//     }
// }

const searchOpenLibraryBooks = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Parameter "query" is required' });
    }

    if (cache.has(query)) {
        console.log('Fetching data from cache');
        return res.status(200).json(cache.get(query));
    }

    try {
        const response = await openAPI.get(`/search.json?q=${encodeURIComponent(query)}`);

        const books = response.data.docs.map(parseBooks);

        cache.set(query, books);

        return res.status(200).json(books);

    } catch (error) {
        console.error('Error fetching data from Open Library API:', error.message);

        return res.status(500).json({ msg: 'Failed to fetch data from Open Library API', error: error.message });
    }
};

module.exports = {
    searchOpenLibraryBooks,
};