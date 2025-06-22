const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { sendMessage } = require('../controllers/messageController');
const messsageRouter = express.Router();

messsageRouter.post('/sendMessage', authMiddleware, sendMessage);

module.exports = { messsageRouter };