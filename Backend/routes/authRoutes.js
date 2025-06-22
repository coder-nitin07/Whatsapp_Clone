const express = require('express');
const { register, login } = require('../controllers/authController');
const { authValidator } = require('../middlewares/authValidator');
const { loginValidator } = require('../middlewares/loginValidator');
const authRouter = express.Router();

authRouter.post('/register', authValidator, register);
authRouter.post('/login', loginValidator, login);

module.exports = { authRouter };