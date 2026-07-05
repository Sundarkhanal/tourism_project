import React, { useState, useEffect } from "react";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import api from "../../api/axios";

const UpdateBlog = ({ isOpen, onClose, blog, onUpdate }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setDescription(blog.description || "");
      setImage(null);
    }
  }, [blog]);

  if (!isOpen || !blog) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      await api.put(`/blog/update-blog/${blog._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Story updated successfully!");

      if (onUpdate) onUpdate();

      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to update story.");
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
        className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Story
          </h2>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Description */}
          <div>
            <label className="font-semibold block mb-2 text-gray-700">
              Description
            </label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-xl p-4 resize-none focus:ring-2 focus:ring-teal-600 outline-none"
            />
          </div>

          {/* Current Image Preview Fixed URL path */}
          {blog.image && !image && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Current Image:</p>
              <img
                src={`http://localhost:9005/assets/${blog.image}`}
                alt="Current Preview"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          )}

          {/* New Preview */}
          {image && (
            <div>
              <p className="text-sm text-gray-500 mb-2">New Image Preview:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="New Preview"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Upload Dropzone */}
          <label className="border-2 border-dashed rounded-2xl h-36 flex flex-col justify-center items-center cursor-pointer hover:border-teal-600 transition">
            <FaCloudUploadAlt
              size={45}
              className="text-teal-600 mb-2"
            />
            <p className="text-gray-700 font-medium">Choose New Image (optional)</p>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-teal-700 text-white rounded-xl hover:bg-teal-800 disabled:opacity-60 transition"
            >
              {loading ? "Updating..." : "Update Story"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;