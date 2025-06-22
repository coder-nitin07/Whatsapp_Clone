const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getMyProfile } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/getProfile', authMiddleware, getMyProfile);

module.exports = { userRouter };