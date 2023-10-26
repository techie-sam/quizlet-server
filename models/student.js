const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }

  next();
});

// studentSchema.pre(/^find/, async function (next) {
//   console.log('hello');
// });

studentSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
