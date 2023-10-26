const Applicant = require('../models/applicant');
const Test = require('../models/Test');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  if (!req.body.testId) req.body.testId = req.params.testId;

  req.body.dateRegistered = Date.now();
  if (!req.body.testId)
    return next(new AppError('Kindly provide a testId', 403));

  if (!(await Test.findById(req.body.testId)))
    return next(new AppError('No test with that id', 404));

  const newApplicant = await Applicant.create(req.body);

  res.status(201).json({
    message: 'Applicant registered successfully',
    newApplicant,
  });
});

exports.getAllApplicants = catchAsync(async (req, res, next) => {
  const applicants = await Applicant.find();

  res.status(200).json({
    status: 'success',
    data: applicants,
  });
});

exports.getApplicant = catchAsync(async (req, res, next) => {
  const applicant = await Applicant.findOne({ student: req.params.id });

  if (!applicant) return next(new AppError('No applicant with that ID!', 404));
  res.status(200).json({
    status: 'success',
    data: applicant,
  });
});

exports.validateApplicant = catchAsync(async (req, res, next) => {
  const applicant = await Applicant.findOne({
    student: req.user.id,
    test: req.params.id,
  });

  if (!applicant)
    return next(new AppError('You did not registered for that test!'));

  req.user.isApplicant = true;
  next();
});
