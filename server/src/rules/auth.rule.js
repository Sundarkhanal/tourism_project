const Joi = require("joi");

const RegisterDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(25).required().messages({
        "any.required":"Password is Compulsory"
    }),
    confirmPassword: Joi.ref('password'),
})

module.exports = RegisterDTO