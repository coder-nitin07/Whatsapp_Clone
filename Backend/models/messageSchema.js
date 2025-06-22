const mongoose = require('mongoose');

const messageScheam = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    content: {
        type: String
    },
    messageType: {
        type: String,
        enum: [ 'text', 'image', 'video', 'pdf' ]
    },
    fileUrl: {
        type: String
    },
    seenBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},{ timestamps: true });

const Message = mongoose.model('Message', messageScheam);

module.exports = { Message };