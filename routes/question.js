const express = require('express');
const { getQuestions } = require('../controllers/questionController');

const router = express.Router();

router.get('/:questionId', getQuestions);

module.exports = router;
