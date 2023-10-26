const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Student',
  },
  test: {
    type: mongoose.Schema.ObjectId,
    ref: 'Test',
    required: true,
    enum: [
      '64df4db45042b69d5758aa31',
      '64df4db45042b69d5758aa32',
      '64df4db45042b69d5758aa33',
    ],
  },
  dateRegistered: {
    type: Date,
    required: true,
    default: null,
  },
  dateTaken: {
    type: Date,
    default: null,
  },
  _id: {
    type: String,
    default: null,
  },
});

// applicantSchema.pre('save', function (next) {
//   this._id = null
//   next()
// });

const Applicant = mongoose.model('applicant', applicantSchema);

module.exports = Applicant;
