const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewer_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",      
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: "", 
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review_text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);