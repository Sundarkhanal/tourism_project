const Joi = require("joi");

const DestinationDTO = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    region: Joi.string().min(2).max(100).required(),
    category:Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    description: Joi.string().min(10).max(1000).required(),
    image: Joi.string().optional(),
    favorite: Joi.boolean().optional()
});
const DestinationUpdateDTO = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    region: Joi.string().min(2).max(100).required(),
    category:Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    description: Joi.string().min(10).max(1000).required(),
    image: Joi.string().optional(),
    favorite: Joi.boolean().optional()
});

module.exports = {
    DestinationDTO,
    DestinationUpdateDTO
};