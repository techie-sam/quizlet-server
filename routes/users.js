const express = require('express');
const authController = require('../controllers/authController');
const { getUsers, getUser } = require('../controllers/usersController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/', getUsers);

router.get('/:id', getUser);

module.exports = router;
