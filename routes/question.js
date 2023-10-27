const express = require('express');
const { getQuestionsRandom } = require('../controllers/questionController');

const router = express.Router();

router.get('/:questionId', getQuestionsRandom);

module.exports = router;
