require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenGenerate = ({ email }) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  return { token };
};

const tokenVerify = (authToken) => jwt.verify(authToken, process.env.JWT_SECRET);

module.exports = { tokenGenerate, tokenVerify };