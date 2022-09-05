const express = require('express');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');

const app = express();

app.use(express.json());
app.use('/login/', loginController);
app.use('/user/', userController);

module.exports = app;
