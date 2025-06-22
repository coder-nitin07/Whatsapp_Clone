const Chat = require("../models/chatSchema");
const { Message } = require("../models/messageSchema");

// Send Message API
const sendMessage = async (req, res)=>{
    try {
        const sender = req.user._id;
        const { content, messageType, chatId } = req.body;

        const existingChat = await Chat.findOne({ _id: chatId });
        if(!existingChat){
            return res.status(404).json({ message: 'Chat not found' });
        }

        const message = await Message.create({
            sender,
            chat: chatId,
            content,
            messageType
        });

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
        res.status(201).json({ message: 'Message Send Successfully', message });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { sendMessage };