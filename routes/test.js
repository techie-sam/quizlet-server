const express = require('express');

const router = express.Router();
const { getTests, getTest } = require('../controllers/testController');
const applicantRouter = require('./applicant');

router.use('/:testCode/applicants', applicantRouter);
router.get('/', getTests);
router.get('/:code', getTest);

module.exports = router;
