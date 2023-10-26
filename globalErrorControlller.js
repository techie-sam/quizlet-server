/* eslint-disable no-use-before-define */
/* eslint-disable node/no-unsupported-features/es-syntax */

const AppError = require('./utils/AppError');

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = err;
  if (err.code === 11000) error = handleDuplicateKeyError(err);
  if (err.name === 'ValidationError') error = handleValidationError(err);
  if (err.name === 'JsonWebTokenError') error = handleInvalidJWT();
  if (err.name === 'TokenExpiredError') error = handleExpiredJWT();

  if (process.env.NODE_ENV === 'production')
    return handleProductionError(error, res);
  if (process.env.NODE_ENV === 'development')
    return handleDevelopmentError(error, res);
};

function handleProductionError(error, res) {
  if (error.isOperational) {

    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  console.log('Error🔥🔥🔥', error);
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
}

function handleDevelopmentError(err, res) {

  console.error(`Development Error: ${err.name} - ${err.message}`);
  console.error(err.stack);

  res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function handleDuplicateKeyError(error) {
  const duplicateKey = Object.keys(error.keyValue)[0];

  const message = `Someone with that ${duplicateKey} already exists. Please use a unique ${duplicateKey}.`;

  return new AppError(message, 409);
}

function handleValidationError(err) {
  const invalidPaths = Object.keys(err.errors).join(',');
  const message = `Invalid values provided for path(s) (${invalidPaths})`;

  return new AppError(message, 403);
}

function handleInvalidJWT() {
  return new AppError('Invalid token. Please log in again!', 401);
}

function handleExpiredJWT() {
  return new AppError('Your token has expired! Please log in again.', 401);
}

module.exports = globalErrorHandler;
