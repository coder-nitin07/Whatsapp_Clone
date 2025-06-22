const Joi = require('joi');

const authSchema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required()
});

const authValidator = async (req, res, next)=>{
    const { error } = authSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: 'Invalid Input data', details: error.details });
    }

    next();
};

module.exports = { authValidator };