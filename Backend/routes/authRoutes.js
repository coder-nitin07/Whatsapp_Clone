const express = require('express');
const { register, login } = require('../controllers/authController');
const { authValidator } = require('../middlewares/authValidator');
const { loginValidator } = require('../middlewares/loginValidator');
const { authMiddleware } = require('../middlewares/authMiddleware');
const authRouter = express.Router();

authRouter.post('/register', authValidator, register);
authRouter.post('/login', loginValidator, login);

// Test the AuthMiddleware token
authRouter.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

module.exports = { authRouter };