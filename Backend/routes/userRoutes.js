const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getMyProfile, getAllUsers } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/getProfile', authMiddleware, getMyProfile);
userRouter.get('/getAllUsers', authMiddleware, getAllUsers);

module.exports = { userRouter };