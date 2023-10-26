const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const checkRequiredFields = require('../utils/helpers/checkRequiredFields');
const User = require('../models/User');

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

exports.register = (Model) =>
  catchAsync(async (req, res, next) => {
    checkRequiredFields(req.body, [
      'firstname',
      'lastname',
      'email',
      'password',
      'password',
    ]);
    const doc = await Model.create(req.body);

    const token = signToken(doc._id, doc.role);
    doc.password = undefined;
    doc.__v = undefined;

    res.status(201).json({
      message: 'Registration Successful',
      token,
      doc,
    });
  });

exports.login = (Model) =>
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    checkRequiredFields(req.body, ['email', 'password']);

    const student = await Model.findOne({ email }).select('+password');
    if (!student || !(await Model.verifyPassword(password)))
      return next(new AppError('Invalid email or password', 400));

    const token = signToken(student._id);

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
      ),
      // httpOnly: true,
      // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    res.status(200).json({
      ok: true,
      token: token,
    });
  });

exports.protect = catchAsync(async (req, res, next) => {
  //***************
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1][10]
    /* [10] used since JWT are always more than 10 characters in length */
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  //***************

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);

  const student = await Student.findById(decodedToken.id);

  if (!student)
    return next(
      new AppError(
        `${
          decodedToken.role === 'artist' ? 'An Artist' : 'A user'
        } with this token does no longer exist`,
        401,
      ),
    );

  // if (doc.passwordChangedAfterJWT(decodedToken.iat))
  //   return next(
  //     new AppError('Your session has expired, Kindly log in again.', 401),
  //   );

  // doc.role = decodedToken.role;

  student.id = student._id;
  student.role = 'student';
  req.user = student;

  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles ['admin', 'applicant']. role='user'
    // if (req.user.role ==='applicant'){
    //   const student = await Applicant.findById(req.user.id)
    //   if (!student) return "This route is restricted to only Applicants"
    // }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    // if (!roles.include)
    next();
  };
