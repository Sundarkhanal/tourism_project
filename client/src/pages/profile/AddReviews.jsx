import React, { useState } from "react";
import api from "../../api/axios";
import { toast } from "sonner";
import { FaStar, FaRegStar, FaMapMarkerAlt, FaHeart, FaUser, FaPen } from "react-icons/fa";

const AddReview = ({ user, activeTab, setActiveTab, favoriteCount = 0 }) => {
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await api.post("/review/create-review", {
        location,
        rating: String(rating),
        review_text: review,
      });

      toast.success("Review submitted successfully!");
      setLocation("");
      setReview("");
      setRating(0);
      setHoverRating(0);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border">

      {/* Tabs */}
      <div className="flex items-center gap-8 px-8 pt-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex items-center gap-2 pb-4 whitespace-nowrap transition cursor-pointer ${
            activeTab === "favorites"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-500 hover:text-teal-700"
          }`}
        >
          <FaHeart />
          My Favorites
          <span className="bg-teal-700 text-white text-xs px-2 py-1 rounded-full">
            {favoriteCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("addReview")}
          className={`flex items-center gap-2 pb-4 whitespace-nowrap transition cursor-pointer ${
            activeTab === "addReview"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-500 hover:text-teal-700"
          }`}
        >
          <FaPen />
          Write Review
        </button>

        <button
          onClick={() => setActiveTab("account")}
          className={`flex items-center gap-2 pb-4 whitespace-nowrap transition cursor-pointer ${
            activeTab === "account"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-500 hover:text-teal-700"
          }`}
        >
          <FaUser />
          Account Details
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Write a Review</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              <FaMapMarkerAlt className="inline mr-2 text-teal-600" />
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Your Location"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Rating
            </label>
            <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                >
                  {star <= (hoverRating || rating) ? (
                    <FaStar className="text-yellow-400 text-2xl " />
                  ) : (
                    <FaRegStar className="text-gray-300 text-2xl" />
                  )}
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-500">
                {rating > 0 ? `${rating}/5` : "Rate"}
              </span>
            </div>
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Review
            </label>
            <textarea
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2.5 rounded-xl transition shadow-sm hover:shadow-md cursor-pointer"
          >
            Submit Review
          </button>
          
        </form>
      </div>

    </div>
  );
};

export default AddReview;