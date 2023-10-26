const AppError = require('../AppError');
/**
 * Checks the the given data against the given hash.
 */
const checkRequiredFields = (data, requiredFields) => {
  requiredFields.forEach((field) => {
    if (!data[field]) throw new AppError(`${field} is required.`, 403);
  });
};

module.exports = checkRequiredFields;
