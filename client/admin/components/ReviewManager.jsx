import { useState, useEffect, useCallback, useMemo } from "react";
import { FaTrash, FaMapMarkerAlt, FaStar } from "react-icons/fa";

import api from "../../src/api/axios";


function ReviewManager() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/review/all-reviews");
      const reviewData = response.data?.data;
      setReviews(Array.isArray(reviewData) ? reviewData : []);
    } catch (fetchError) {
      setError(fetchError.response?.data?.message || "Unable to fetch reviews.");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return "0.0";
    const total = reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      setDeletingId(id);
      await api.delete(`/review/${id}`);
      setReviews((prev) => prev.filter((item) => item._id !== id));
    } catch (deleteError) {
      alert(deleteError.response?.data?.message || "Failed to delete review.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">User Reviews</h1>
          <p className="text-gray-500 mt-1">{reviews.length} Reviews — Average {averageRating}</p>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-gray-600">Loading reviews...</div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">{error}</div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-gray-500">No reviews available yet.</div>
      )}

      {!loading && !error && reviews.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {reviews.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{item.name || "Traveler"}</h2>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <FaMapMarkerAlt className="text-teal-600" />
                    <span>{item.location || "Unknown"}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                  disabled={deletingId === item._id}
                >
                  <FaTrash size={14} />
                  {deletingId === item._id ? "Deleting..." : "Delete"}
                </button>
              </div>

              <p className="text-gray-700 mt-4 leading-relaxed">{item.review_text}</p>

              <div className="flex items-center gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={star <= Number(item.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="text-sm text-gray-500">{Number(item.rating || 0)}/5</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewManager;