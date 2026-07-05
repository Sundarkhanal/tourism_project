const Joi = require("joi");

const NewsDTO = Joi.object({
    title:Joi.string().min(3).max(150).required().messages({
        "any.required":"Title is compulsory for uploading news"
    }),
    description:Joi.string().min(10).max(255).required().messages({
        "any.required":"Description is compulsory for uploading news"
    }),
    location:Joi.string().required(),
    publisherName:Joi.string().required(),
    image:Joi.string().required().messages({
        "any.required":"Image is required"
    })
})
const NewsUpdateDTO = Joi.object({
    title:Joi.string().min(3).max(150).required().messages({
        "any.required":"Title is compulsory for uploading news"
    }),
    description:Joi.string().min(10).max(255).required().messages({
        "any.required":"Description is compulsory for uploading news"
    }),
    location:Joi.string().required(),
    publisherName:Joi.string().required(),
    image:Joi.string().required().messages({
        "any.required":"Image is required"
    })
})

module.exports = {
    NewsDTO,
    NewsUpdateDTO
}