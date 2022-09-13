const { User } = require('../database/models');
const tokenHelper = require('../helpers/tokenHelper');
const validation = require('../helpers/userValidation');

const create = async (user) => {
    const validUser = validation.userValidation(user);
    if (validUser) return validUser;
    
    const verifyEmail = await validation.emailValidation(user);
    if (verifyEmail) return verifyEmail;
  
    const newUser = await User.create(user);
  
    const token = tokenHelper.tokenGenerate(newUser.email);
  
    return { code: 201, data: token };
};

const findAll = async () => {
    const result = await User.findAll({ attributes: { exclude: ['password'] } });
    return result;
};

const findById = async (id) => {
    const result = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!result) {
        return { code: 404, message: 'User does not exist' }; 
    }
    return { code: 200, user: result };
};

module.exports = { create, findAll, findById };