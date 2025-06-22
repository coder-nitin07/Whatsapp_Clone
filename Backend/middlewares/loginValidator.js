const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required()
});

const loginValidator = async (req, res, next)=>{
    const { error } = loginSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: 'Invalid Input data', details: error.details });
    }

    next();
};

module.exports = { loginValidator };