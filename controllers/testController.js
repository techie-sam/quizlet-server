const Test = require('../models/Test');
const { getOne, getAll, createOne } = require('./handlerFactory');

exports.getTests = getAll(Test);
exports.getTest = getOne(Test);
exports.createTest = createOne(Test, ['user', 'duration', 'questions']);
