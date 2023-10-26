const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = require('./app');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connection successful!'));

app.listen('5000', () => {
  console.log('Server started');
});