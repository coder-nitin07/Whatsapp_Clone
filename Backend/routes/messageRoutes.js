const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { sendMessage, getMessages, seenMessages, getRecentChats, accessChats, fetchAllMessages } = require('../controllers/messageController');
const messsageRouter = express.Router();

messsageRouter.post('/sendMessage', authMiddleware, sendMessage);
messsageRouter.get('/getMessages/:chatId', authMiddleware, getMessages);
messsageRouter.post('/seenMessages', authMiddleware, seenMessages);
messsageRouter.post('/accessChats', authMiddleware, accessChats);
messsageRouter.get('/getRecentChats', authMiddleware, getRecentChats);
messsageRouter.get('/fetchAllMessages/:roomId', authMiddleware, fetchAllMessages);

module.exports = { messsageRouter };