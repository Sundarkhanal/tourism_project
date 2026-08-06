const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        min: 3,
        max: 150,
    },
    description: {
        type: String,
        required: true,
        min: 10,
        max: 2000,
    },
    location: {
        type: String,
        trim: true,
        required: true,
    },
    publisherName: {
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