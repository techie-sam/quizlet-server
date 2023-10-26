const mongoose = require('mongoose');
const { shuffle } = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const Question = mongoose.model('question', {});

exports.getQuestions = catchAsync(async (req, res, next) => {

  if (req.query.length < 0) return next(new AppError("Question length cannot be les than 0"))

  let questions = await Question.find({ testID: req.params.id });
  questions = shuffle(questions);
  questions.length = req.query.length || questions.length;

  res.status(200).json({
    status: 'success',
    length: questions.length,
    data: questions,
  });
});
