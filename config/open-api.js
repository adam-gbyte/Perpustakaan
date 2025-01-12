require('dotenv').config()
const axios = require('axios')

const openAPI = axios.create({
    baseURL: 'https://openlibrary.org',
    headers: {
        Accept: 'application/json'
    }
})

module.exports = openAPI