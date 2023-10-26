const Student = require('../models/student');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getStudent = catchAsync(async (req, res, next) => {
  if (!req.params.id)
    return next(new AppError('Kindly provide a student id', 403));
  const student = await Student.findById(req.params.id);
  console.log(student);
  if (!student) return next(new AppError('No student found ith that id!', 404));

  res.status(200).json({
    status: 'success',
    data: student,
  });
});

exports.getStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find();

  res.status(200).json({ status: 'success', data: students });
});
