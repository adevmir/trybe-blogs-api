require('dotenv').config();
const express = require('express');
const postService = require('../services/postServices');
const tokenHelper = require('../helpers/tokenHelper');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const data = await postService.findAll();
    tokenHelper.tokenVerify(authorization);  
    return res.status(200).json(data);
  } catch (err) {
     res.status(401).json({ message: 'Expired or invalid token' });
  }
});

router.get('/:id', async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const date = tokenHelper.tokenVerify(authorization);
    console.log('nao sei', { date: date.userId });
    const { code, message, post } = await postService.findById(id);
    if (post === null) {
      res.status(code).json({ message });
    }
    res.status(code).json(post);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
});

router.get('/search', async (req, res) => {
  const { q } = req.query;
  const data = await postService.find(q);
  res.status(200).json(data);
});

module.exports = router;