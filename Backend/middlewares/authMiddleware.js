const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next)=>{
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if(!token){
            return res.status(401).json({ message: 'Access Denied. Invalid token' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Invalid or expires token.' });
    }
};

module.exports = { authMiddleware };