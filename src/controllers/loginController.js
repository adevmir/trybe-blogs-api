const express = require('express');
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
    const user = await loginService.findByLogin({ email, password });
    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    console.log(`Aquiii ${process.env.JWT_SECRET} e token igual a ${token}`);
    return res.status(200).json({ token });
});

module.exports = router;