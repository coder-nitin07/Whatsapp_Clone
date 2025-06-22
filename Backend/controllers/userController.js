const User = require("../models/userSchema");

// Get Profile
const getMyProfile = async (req, res)=>{
    try {
        const user = req.user;
        
        const getUser = await User.findOne({ id: user.id });
        if(!getUser){
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Profile Fetched Successfully', profile: getUser });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All Users for sidebar
const getAllUsers = async (req, res)=>{
    try {
        const currentUser = req.user;

        const users = await User.find({ _id: { $ne: currentUser } });

        if(users.length == 0){
            return res.status(404).json({ message: 'No Users found' }).select("-password");;
        }

        res.status(200).json({ message: 'All Users Fetched Successfully', users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { getMyProfile, getAllUsers };