const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const studentController = require('../controllers/student');

// router.post('/register', authController.register);
// router.post('/login', authController.login);

// router.route('/').get(studentController.getStudents);
// router.route('/:id').get(studentController.getStudent);

module.exports = router;
