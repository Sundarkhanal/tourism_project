const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        min: 3,
        max: 255,
    },
    description: {
        type: String,
        required: true,
        min: 10,
        max: 200,
    },
    location: {
        type: String,
        trim: true,
        required: true,
    },
    publisher_name: {
        type: String,
        required: true,
        trim: true,
        default: "Admin"
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const NewsModel = mongoose.model("News", NewsSchema);
module.exports = NewsModel;