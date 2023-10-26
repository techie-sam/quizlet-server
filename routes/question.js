const express = require('express');

const router = express.Router({ mergeParams: true });
const { getQuestions } = require('../controllers/question');

// const authController = require('../controllers/authController');
// const applicantController = require('../controllers/applicant');
// // router.use(authFactory.protect);

// router.route('/:id').get(
//   authController.protect,
//   applicantController.validateApplicant,
//   // authController.restrictTo('applicant'),
//   getQuestions,
// );

// router.route('/').get();

module.exports = router;
