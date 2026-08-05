import React, { useState } from "react";
import { FaEllipsisH, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "sonner";
const BlogCard = ({
  blog,
  currentUser,
  onDelete,
  onEdit,
}) => {

    
  const [activeMenu, setActiveMenu] = useState(null);
  const displayName = blog.user_id?.name || "Anonymous";
  console.log("createdAt:", blog.createdAt);

  const isOwner =
    currentUser?._id &&
    String(currentUser._id) ===
      String(blog.user_id?._id || blog.user_id);

  return (
    <div className="bg-color-card rounded-3xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 grid place-items-center font-bold uppercase">
            {displayName[0]}
          </div>

          <h2 className="font-semibold text-gray-900">
            {displayName}
          </h2>
        </div>

        {/* Menu */}
        <div className="relative ">
          <button
            onClick={() =>
              setActiveMenu(activeMenu === blog._id ? null : blog._id)
            }
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <FaEllipsisH />
          </button>

          {activeMenu === blog._id && (
            <div className="absolute right-0 top-10 w-28 bg-white rounded-md shadow-md border py-1 text-xs z-20">
              {isOwner ? (
                <>
                  <button
                    onClick={() => {
                      onEdit(blog);
                      setActiveMenu(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                  >
                    <FaEdit size={12} />
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      onDelete(blog._id);
                      setActiveMenu(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    <FaTrash size={12} />
                    Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied!");
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  Copy Link
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Image */}
      {blog.image && (
        <img
          src={`${blog.image}`}
          alt="Travel"
          className="w-full h-96 object-cover"
        />
      )}

      {/* Description */}
      <div className="p-5 text-sm">
        <p className="text-gray-700">
          <span className="font-semibold text-gray-900 mr-2">
            {displayName}
          </span>
          {blog.description}
        </p>

        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
          {new Date(parseInt(blog._id.substring(0, 8), 16) * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}        
        </p>
      </div>
    </div>
  );
};

export default BlogCard;