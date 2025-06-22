const Chat = require("../models/chatSchema");

// Create Chat
const createChat = async (req, res)=>{
    try {
        const senderId = req.user._id;
        const { receiverId } = req.body;

        if(!receiverId){
            return res.status(400).json({ message: 'Receiver ID is required' });
        }

        const existingChat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [ senderId, receiverId ] }
        });

        if(existingChat){
            return res.status(200).json({ message: 'Chat Already exists.', room: existingChat });
        }

        const newChat = await Chat.create({
            users: [ senderId, receiverId ],
            isGroupChat: false
        });

        res.status(201).json({ message: 'Chat Created Successfully', room: newChat });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createChat };