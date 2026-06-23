const Joi = require("joi");
const genderPattern = /^(male|female|others)/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_-]).{8,25}$/

const RegisterDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordPattern).required().messages({
        "any.required":"Password is Compulsory",
        'string.pattern.base': "Password must have 1 Lowercase Character, 1 Uppercase Character, 1 number and a special letter"
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
        "any.only":"Password and Confirm Password must match"
    }),
    phone:Joi.string().required().messages({
        "string.empty": "Phone is not allowed to by empty"
    }),
    gender:Joi.string().regex(genderPattern).required().messages({
        "string.pattern.base":"Gender must be either Male or Female or Others"
    }),
    address:Joi.string().optional().allow(null, "").default(null)
})

const OTPVerifyDTO = Joi.object({
    otp: Joi.string().required(),
    email: Joi.string().email().required()
})

const LoginDTO = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required()
})
module.exports = {
    RegisterDTO,
    OTPVerifyDTO,
    LoginDTO

}
