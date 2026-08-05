import React, { useState } from "react";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "sonner";
import api from "../../api/axios";

const CreateBlog = ({ isOpen, onClose, onBlogCreated }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error("Please write your travel experience.");
      return;
    }

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", image);

      await api.post("/blog/create-blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Story published successfully!");

      //Trigger the automatic feed refetch on main page
      if (onBlogCreated) {
        onBlogCreated();
      }

      setDescription("");
      setImage(null);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Share Your Travel Experience
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Your Experience
            </label>

            <textarea
              rows="7"
              placeholder="Tell everyone about your trip..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-teal-600 outline-none resize-none"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Upload Photo
            </label>

            <label className="border-2 border-dashed border-gray-300 rounded-2xl h-52 flex flex-col items-center justify-center cursor-pointer hover:border-teal-600 transition">
              <FaCloudUploadAlt
                size={55}
                className="text-teal-600 mb-3"
              />

              <p className="font-medium text-gray-700">
                Click to choose an image
              </p>

              <p className="text-sm text-gray-500">
                JPG, JPEG or PNG
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            {image && (
              <p className="mt-3 text-sm text-green-600">
                Selected: {image.name}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-teal-700 text-white hover:bg-teal-800 disabled:opacity-60"
            >
              {loading ? "Publishing..." : "Publish Story"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;