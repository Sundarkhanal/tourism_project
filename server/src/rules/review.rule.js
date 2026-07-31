const joi = require("joi")

const ReviewDTO = joi.object({
    location: joi.string().required(),
    rating: joi.number().min(1).max(5).required(),
    review_text: joi.string().required()
})


module.exports = {
    ReviewDTO
}