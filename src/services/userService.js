const { User } = require('../database/models');

const findByLogin = async (email) => {
    const result = await User.findOne({ where: email });
    return result;
};

module.exports = { findByLogin };