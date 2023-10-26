const jwt = require('jsonwebtoken');
const User = require('../models/User');

const catchAsync = require('../utils/catchAsync');
const checkRequiredFields = require('../utils/helpers/checkRequiredFields');
const AppError = require('../utils/AppError');

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

exports.register = catchAsync(async (req, res, next) => {
  checkRequiredFields(req.body, ['firstname', 'lastname', 'email', 'password']);
  req.body.role = undefined;
  const doc = new User(req.body);
  await doc.matchPasswords(req.body.passwordConfirm);
  await doc.save();

  doc.password = undefined;
  doc.__v = undefined;
  // const token = signToken(doc._id);

  res.status(201).json({
    message: 'Registration Successful',
    // token,
    doc,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  checkRequiredFields(req.body, ['email', 'password']);

  const doc = await User.findOne({ email }).select('+password');

  if (!doc || !(await doc.verifyPassword(password)))
    return next(new AppError('Invalid email or password', 400));
  const token = signToken(doc._id);

  //   res.cookie('jwt', token, {
  //     expires: new Date(
  //       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  //     ),
  //     // httpOnly: true,
  //     // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  //   });

  res.status(200).json({
    status: 'success',
    token: token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.split(' ')[1][10]
    /* [10] used since JWT are always more than 10 characters in length */
  )
    return next(new AppError('You are not logged in, Kindly log in', 401));

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);

  // 3) Check if user still exists
  const currentUser = await User.findById(decodedToken.id);
  // console.log(currentUser);
  // if (!currentUser) {
  //   return next(
  //     new AppError(
  //       'The user belonging to this token does no longer exist.',
  //       401,
  //     ),
  //   );
  // }

  // // 4) Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decodedToken.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401),
  //   );
  // }
  currentUser.id = currentUser._id;
  req.user = currentUser;
  next();
});
