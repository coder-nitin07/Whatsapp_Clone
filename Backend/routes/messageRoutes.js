const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { sendMessage, getMessages, seenMessages } = require('../controllers/messageController');
const messsageRouter = express.Router();

messsageRouter.post('/sendMessage', authMiddleware, sendMessage);
messsageRouter.get('/getMessages/:chatId', authMiddleware, getMessages);
messsageRouter.post('/seenMessages', authMiddleware, seenMessages);

module.exports = { messsageRouter };