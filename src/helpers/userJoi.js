const joi = require('joi');

const userSchema = joi.object({
  displayName: joi.string().min(8).required().messages({
    'string.min': '400|"displayName" length must be at least 8 characters long',
  }),
  email: joi.string().email().required().messages({
    'string.email': '400|"email" must be a valid email',
  }),
  password: joi.string().min(6).required().messages({
    'string.min': '400|"password" length must be at least 6 characters long',
  }),
});

module.exports = { userSchema };