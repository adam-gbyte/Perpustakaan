const exampleRouter = require('./routes/example.routes');

const userManagerRouter = require('./routes/user-manager.routes');
const userRouter = require('./routes/user.routes');
const bookRouter = require('./routes/book.routes');
const loansRouter = require('./routes/loans.routes')
const reviewRouter = require('./routes/review.routes');
const externalApiRouter = require('./routes/external.routes');

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const userLogger = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(express.json());

app.use(userLogger);

app.use('/', exampleRouter);
app.use('/api', userManagerRouter);
app.use('/api', bookRouter);
app.use('/api', userRouter);
app.use('/api', loansRouter);
app.use('/api', reviewRouter);
app.use('/api', externalApiRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`http://localhost:${port}/api/users`);
});