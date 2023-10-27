const Question = require('../models/questions');
const { getAll } = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getQuestionsRandom = catchAsync(async (req, res) => {
  const doc = await Question.aggregate([
    { $match: { testID: req.params.questionId } },
    { $sample: { size: 15 } },
  ]);

  res.status(200).json({
    status: 'success',
    data: doc,
    length: doc.length,
  });
});

exports.getQuestions = getAll(Question);
