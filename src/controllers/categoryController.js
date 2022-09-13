require('dotenv').config();
const express = require('express');
const categoryService = require('../services/categoryService');
const tokenHelper = require('../helpers/tokenHelper');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  if (!name) return res.status(400).json({ message: '"name" is required' });
  
  try {
    tokenHelper.tokenVerify(authorization);
  } catch (err) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
  const { code, data } = await categoryService.create({ name });
  
  return res.status(code).json(data);
});

module.exports = router;