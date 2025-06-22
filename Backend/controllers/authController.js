const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

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

// login route
const login = async (req, res)=>{
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: 'Please filled all the required fields.' });
        }

        const user = await User.findOne({ email }).select('+password');
        if(!user){
            return res.status(400).json({ message: 'Invalid Credentails' });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(401).json({ message: 'Invalid Credentails' });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: 'User login successfully', 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { register, login };