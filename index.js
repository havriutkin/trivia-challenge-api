/* ------------ Imports ------------ */
// External dependencies
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');            // For pasing body
const cors = require('cors');                         // For limiting domains that can make requests to api
const dotenv = require('dotenv');                     // For environment variables
const morgan = require('morgan');                     // For logging
const cookieParser = require('cookie-parser');        // For parsing cookies
const helmet = require('helmet');                     // For security headers

// Internal dependencies
const authRouter = require('./src/routes/authRouter');
const userRouter = require('./src/routes/userRouter');
const quizRouter = require('./src/routes/quizRouter');
const errorHandler = require('./src/middleware/errorHandlerMiddleware');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

//https://trivia-challenge-client.onrender.com'
const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


/* ------------ Middlewares ------------ */
// Disable powered-by header
app.disable('x-powered-by')

// Helmet
app.use(helmet());

// Cors
app.use(cors(corsOptions));

// Static files 
app.use(express.static(__dirname + '/public'));

// Body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Cookie parser
app.use(cookieParser());

// Logger
const logStream = fs.createWriteStream(path.join(__dirname, 'activity.log'), {flags: 'a'});
// Don't include file stream for now, due to render free service
const logger = morgan('common');
app.use(logger);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/quiz', quizRouter);

// Error handler
const errStream = fs.createWriteStream(path.join(__dirname, 'errors.log'), {flags: 'a'});
const errorMiddleware = errorHandler(errStream);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;