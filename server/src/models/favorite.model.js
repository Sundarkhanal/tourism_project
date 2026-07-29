const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
{
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    destination_id: {
        type: mongoose.Types.ObjectId,
        ref: "Destination",
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Favorite", favoriteSchema);
