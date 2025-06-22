const mongoose = require('mongoose');

const dbConnection = async (req, res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = dbConnection;