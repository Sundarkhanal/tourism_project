const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    destination_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: false,
    },
    description: {
        type: String,
        min: 3,
        max: 1000,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})
const BlogModel = mongoose.model("Blog", BlogSchema)
module.exports = BlogModel