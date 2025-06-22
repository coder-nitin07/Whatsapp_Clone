const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { sendMessage, getMessages } = require('../controllers/messageController');
const messsageRouter = express.Router();

messsageRouter.post('/sendMessage', authMiddleware, sendMessage);
messsageRouter.get('/getMessages/:chatId', authMiddleware, getMessages);

module.exports = { messsageRouter };