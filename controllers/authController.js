const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

exports.protect = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.split(' ')[1][10]
    /* [10] used since JWT are always more than 10 characters in length */
  )
    return next(new AppError('You are not logged in, Kindly log in', 401));

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);
  console.log(decodedToken);

  // // 3) Check if user still exists
  const currentUser = await User.findById(decodedToken.id);
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

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
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
