const express = require('express');
const userService = require('../services/userServices');
const tokenHelper = require('../helpers/tokenHelper');

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { code, data, message } = await userService.create({ displayName, email, password, image });
    
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
});

router.get('/', async (req, res, _next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    tokenHelper.tokenVerify(authorization);
    const result = await userService.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
});

router.get('/:id', async (req, res, _next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    tokenHelper.tokenVerify(authorization);
    const { code, message, user } = await userService.findById(id);
    if (!user) {
      res.status(code).json({ message });
    }
    res.status(code).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
});

module.exports = router;