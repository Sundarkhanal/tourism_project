const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 25,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination"
    }],
    phone: String,
    address: String,
    otp: String,
    gender: String,
    passwordResetToken: String,
    passwordResetExpiry: Date,
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel