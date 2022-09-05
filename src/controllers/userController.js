const express = require('express');
const userService = require('../services/userServices');

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { code, data, message } = await userService.create({ displayName, email, password, image });
    
  if (!data) return res.status(Number(code)).json({ message });

  return res.status(code).json(data);
});

module.exports = router;