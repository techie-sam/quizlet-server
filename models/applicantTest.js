const mongoose = require('mongoose');

const testApplicantShema = mongoose.Schema({
  applicant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Applicant',
    required: true,
  },
  testId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Applicant',
    required: true,
  },
  dateTaken: {
    type: Date,
  },
  applicantAnswer: {
    type: Array
  },
  score: {
    type: Number,
  },
});

const TestApplicant = mongoose.model('applicantTest', testApplicantShema);

module.exports = TestApplicant;
