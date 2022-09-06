const { User } = require('../database/models');

const findByLogin = async ({ email, password }) => {
    const result = await User.findOne({ where: { email, password } });
    return result;
};

module.exports = { findByLogin };