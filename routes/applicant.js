const express = require('express');

const router = express.Router({ mergeParams: true });
const { register, getAllApplicants } = require('../controllers/applicant');
// const authController = require('../controllers/authController');

// router.use(authFactory.protect);

router.route('/').get(getAllApplicants).post(register);
// router.post(x);

module.exports = router;
