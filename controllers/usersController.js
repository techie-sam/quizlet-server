const User = require('../models/User');
const { getAll, getOne } = require('./handlerFactory');

exports.getUsers = getAll(User);
exports.getUser = getOne(User);
