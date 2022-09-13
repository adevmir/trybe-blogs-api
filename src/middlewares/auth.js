// const tokenHelper = require('../helpers/tokenHelper');

// const validToken = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) return res.status(401).json({ message: 'Token not found' });

//   try {
//     const data = tokenHelper.tokenVerify(authorization);

//     req.user = data;

//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Expired or invalid token' });
//   }
// };

// module.exports = { validToken };