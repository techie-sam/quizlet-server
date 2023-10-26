const Question = require('../models/questions');
const { getAll } = require('./handlerFactory');

exports.getQuestions = getAll(Question);
