const crypto = require('crypto');

const catchAsync = require('../utils/catchAsync');
const checkRequiredFields = require('../utils/helpers/checkRequiredFields');

function shuffleArray(array) {
  const rng = crypto.randomBytes(16).toString('hex');

  for (let i = array.length - 1; i > 0; i--) {
    const j =
      rng.substr(0, Math.floor(Math.random() * rng.length)).charCodeAt(0) % i;
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

exports.createOne = (Model, requiredFields) =>
  catchAsync(async (req, res, next) => {
    req.body.user = req.user;
    checkRequiredFields(req.body, requiredFields);
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const filter = req.params.questionId
      ? { testID: req.params.questionId }
      : {};
    const doc = await Model.find(filter);

    // // const length
    // const doc = await Model.aggregate([{ $sample: { size: 15 } }]);
    // // console.log(req.query)
    // if (Model.modelName === 'question') shuffleArray(doc);

    res.status(200).json({
      status: 'success',
      data: doc,
      length: doc.length,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });
