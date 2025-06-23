const Chat = require("../models/chatSchema");
const { Message } = require("../models/messageSchema");
const User = require("../models/userSchema");
const { createChat } = require("./chatController");

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

// Seen messages
const seenMessages = async (req, res)=>{
    try {
        const { messageId } = req.body;
        const message = await Message.findById(messageId);
        if(!message){
            return res.status(404).json({ message: 'Message not found' });
        }

        const hasSeen = message.seenBy.includes(req.user._id.toString());

        if(!hasSeen){
            message.seenBy.push(req.user._id);
            await message.save();
        }
        
        res.status(200).json({ message: 'Message Seen successfully', message: hasSeen });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Access All Chats
const accessChats = async (req, res)=>{
    try {
        const { userIds, isGroupChat, chatName } = req.body;
        const loggedInUserId = req.user._id;

        if(!userIds || !Array.isArray(userIds) || userIds.length === 0){
            return res.status(400).json({ message: 'User list is required' });
        }

        // Ensure logged-in user is part of the chat
        const allUsers = [...userIds, loggedInUserId];

        // 1 to 1 chat
        if(!isGroupChat && userIds.length === 1){
            const existingChat = await Chat.findOne({
                isGroupChat: false,
                users: { $all: [ loggedInUserId, userIds[0] ], $size: 2 },
            }).populate('users', '-password');

            if(existingChat){
                return res.status(200).json({ message: '1-to-1 Chat Already Exists', chat: existingChat });
            }

            const otherUser = await User.findById(userIds[0]);
            const newChat = await Chat.create({
                chatName: otherUser.name,
                isGroupChat: false,
                users: [ loggedInUserId, userIds[0] ],
            });

            return res.status(201).json({ message: '1-to-1 Chat created', chat: newChat });
        }

        // Group chat
        if(isGroupChat){
            if(!chatName || userIds.length < 2){
                return res.status(400).json({ message: 'Group Chat required a name and at least 3 memebers' });
            }

            const groupChat = await Chat.create({
                chatName,
                users: allUsers,
                isGroupChat: true,
                groupAdmin: loggedInUserId
            });

            return res.status(201).json({ message: 'Group chat created', chat: groupChat });
        } 
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Fetch all Chats of login
const fetchAllChats = async (req, res)=>{
    try {
        const loggedUser = req.user._id;

        const getChats = await Chat.find({ users: loggedUser })
                        .populate('users', '-password')
                        .populate('latestMessage')
                        .sort({ updatedAt: -1 });
                        
        if(getChats.length == 0){
            return res.status(200).json({ message: 'No Chat Found' });
        }

        res.status(200).json({ message: 'Chat Fetched Successfully', chats: getChats });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { sendMessage, getMessages, seenMessages, createChat, accessChats, fetchAllChats };