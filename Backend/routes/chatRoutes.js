const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { createChat } = require('../controllers/chatController');
const chatRouter = express.Router();

chatRouter.post('/createChat', authMiddleware, createChat);

module.exports = { chatRouter };