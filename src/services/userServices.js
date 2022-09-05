const { User } = require('../database/models');
const tokenHelper = require('../helpers/tokenHelper');
const validation = require('../helpers/userValidation');

const create = async (user) => {
    const validUser = validation.userValidation(user);
    if (validUser) return validUser;
    
    const verifyEmail = await validation.emailValidation(user);
    if (verifyEmail) return verifyEmail;
  
    const newUser = await User.create(user);
  
    const token = tokenHelper.generateToken(newUser.email);
  
    return { code: 201, data: token };
};

module.exports = { create };