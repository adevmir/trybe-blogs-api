const express = require('express');
const userService = require('../services/userServices');

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { code, data, message } = await userService.create({ displayName, email, password, image });
    
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
});

router.get('/', async (req, res, _next) => {
  try {
    const result = await userService.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;