const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');

// register route
const register = async (req, res)=>{
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(404).json({ message: 'User already exist' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashPassword });

        const userObj = newUser.toObject();
        delete userObj.password;

        res.status(201).json({ message: 'User registered Successfully', user: userObj });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { register };