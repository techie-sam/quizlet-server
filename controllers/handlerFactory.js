const catchAsync = require('../utils/catchAsync');
const checkRequiredFields = require('../utils/helpers/checkRequiredFields');

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
    const doc = await Model.find();

    res.status(200).json({
      status: 'success',
      data: doc,
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
