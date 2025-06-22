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

// Get Messages
const getMessages = async (req, res)=>{
    try {
        const { chatId } = req.params;

        const getMessages = await Message.find({ chat: chatId })
                            .populate('sender', 'name email')
                            .sort();

        if(getMessages.length === 0){
            return res.status(404).json({ message: 'No Messages found for this chat.' });
        }

        res.status(200).json({ message: 'Messages Fetched Successfully', messages: getMessages });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { sendMessage, getMessages };