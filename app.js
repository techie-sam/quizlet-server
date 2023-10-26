const express = require('express');
const cors = require('cors');

const app = express();

const usersRoutes = require('./routes/users');
const testRoutes = require('./routes/test');
const questionRoutes = require('./routes/question');
const globalErrorHandler = require('./globalErrorControlller');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.url)

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/tests', testRoutes);
app.use('/api/v1/questions', questionRoutes);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'The requested resource was no found',
  });
});
app.use(globalErrorHandler);

module.exports = app;
