const userRouter = require('./routes/user_route')
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())

app.use(express.json());
app.use('/api', userRouter)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`http://localhost:${port}/api/users`);
});