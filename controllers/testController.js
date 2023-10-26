const Test = require('../models/Test');
const catchAsync = require('../utils/catchAsync');
const checkRequiredFields = require('../utils/helpers/checkRequiredFields');

exports.getTests = catchAsync(async (req, res, next) => {
  const tests = await Test.find();

  res.status(200).json({
    status: 'success',
    data: tests,
  });
});

exports.createTest = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  checkRequiredFields(req.body, ['user', 'duration', 'questions']);
  const tests = await Test.create(req.body);

  res.status(200).json({
    status: 'success',
    data: tests,
  });
});
