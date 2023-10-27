const mongoose = require('mongoose');

const schema = mongoose.Schema({
  test: {
    type: mongoose.Schema.ObjectId,
    ref: 'Test',
    required: true,
  },
  question_text: {
    type: String,
    required: true,
    select: false,
  },
  options: {
    type: Array,
    required: true,
    select: false,
  },
  correct_option: {
    type: Array,
    required: true,
    select: false,
  },
});

const Question = mongoose.model('question', schema);

module.exports = Question;
