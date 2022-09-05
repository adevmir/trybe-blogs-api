require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = ({ email }) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  return { token };
};

module.exports = { generateToken };