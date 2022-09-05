const joiValidation = require('./userJoi');
const { User } = require('../database/models');

const userValidation = ({ displayName, email, password }) => {
  const { error } = joiValidation.userSchema.validate({ displayName, email, password });

  if (error) {
    const [code, message] = error.message.split('|');

    return { code, message };
  }
  return false;
};

const emailValidation = async ({ email }) => {
  const verifyEmail = await User.findOne({ where: { email } });

  if (verifyEmail) return { code: 409, message: 'User already registered' };

  return false;
};

module.exports = { userValidation, emailValidation };