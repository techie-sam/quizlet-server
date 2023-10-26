const express = require('express');

const router = express.Router();
const { getTests, createTest } = require('../controllers/testController');
const { protect } = require('../controllers/authController');
// const applicantRouter = require('./applicant');

router.route('/').get(getTests).post(protect, createTest);

module.exports = router;
