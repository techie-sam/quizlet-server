const express = require('express');
const cors = require('cors');

const app = express();

const usersRoute = require('./routes/users');
const studentRoute = require('./routes/student');
const applicantRoute = require('./routes/applicant');
const questionRoute = require('./routes/question');
const testRoute = require('./routes/test');
const globalErrorHandler = require('./globalErrorControlller');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.url)

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/students', studentRoute);
app.use('/api/v1/tests', testRoute);
app.use('/api/v1/applicants', applicantRoute);
app.use('/api/v1/questions', questionRoute);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'The requested resource was no found',
  });
});
app.use(globalErrorHandler);

module.exports = app;