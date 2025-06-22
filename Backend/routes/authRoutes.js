const express = require('express');
const { register } = require('../controllers/authController');
const { authValidator } = require('../middlewares/authValidator');
const authRouter = express.Router();

authRouter.post('/register', authValidator, register);

module.exports = { authRouter };