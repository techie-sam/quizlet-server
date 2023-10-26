const Test = require('../models/Test');
const catchAsync = require('../utils/catchAsync');

exports.getTests = catchAsync(async (req, res, next) => {
  const tests = await Test.find();

  res.status(200).json({
    status: 'success',
    data: tests,
  });
});

exports.getTest = catchAsync(async (req, res, next) => {
  const test = await Test.findOne({ code: req.params.code });

  res.status(200).json({
    status: 'success',
    data: test,
  });
});
