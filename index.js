/* ------------ Imports ------------ */
// External dependencies
const express = require('express');
const bodyParser = require('body-parser');            // For pasing body
const cors = require('cors');                         // For limiting domains that can make requests to api
const dotenv = require('dotenv');                     // For environment variables

// Internal dependencies
const authRouter = require('./src/routes/authRouter');
const userRouter = require('./src/routes/userRouter');
const quizRouter = require('./src/routes/quizRouter');
const errorHandler = require('./src/middleware/errorHandlerMiddleware');

const app = express();
const port = process.env.PORT || 3000;


/* ------------ Middlewares ------------ */
// Static files 
app.use(express.static(__dirname + '/public'));

// Body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/quiz', quizRouter);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;