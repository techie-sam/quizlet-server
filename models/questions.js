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
  },
  options: {
    type: Array,
    required: true,
  },
  correct_option: {
    type: Array,
    required: true,
  },
});

const Question = mongoose.model('Questions', schema);

module.exports = Question;
