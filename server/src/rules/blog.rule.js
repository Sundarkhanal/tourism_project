const Joi = require("joi")

const BlogDTO = Joi.object({
    image:Joi.string().required().messages({
        "any.required":"Image is required"
    }),
    description:Joi.string().min(2).max(1000).required()
})

module.exports = {
    BlogDTO
}