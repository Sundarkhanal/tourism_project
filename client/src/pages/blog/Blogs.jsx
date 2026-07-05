import React, { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import { FaCamera, FaEllipsisH, FaTrash, FaEdit } from "react-icons/fa";
import CreateBlog from "./CreateBlog";
import UpdateBlog from "./UpdateBlog";

const Blogs = () => {
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [selectedBlogForEdit, setSelectedBlogForEdit] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await api.get("/blog/all-blogs");
      setBlogs(response.data.data || response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await api.delete(`/blog/delete/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      alert("Story deleted successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="bg-gray-50 py-6 min-h-screen">
        <div className="w-full">
          {/* Hero Header */}
          <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-yellow-500 py-6 md:py-8 mb-10 shadow-lg px-4">
            <div className="max-w-xl mx-auto flex flex-row items-center justify-between gap-4 w-full">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Travel Feed</h1>
                <p className="text-white/90 mt-1 text-sm md:text-base">Discover Nepal...</p>
              </div>
              <button 
                onClick={() => setShowCreateBlog(true)}
                className="bg-white text-teal-700 px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition text-sm md:text-base"
              >
                <FaCamera /> Share Story
              </button>
            </div> 
          </div>

          {/* Empty State */}
          {blogs.length === 0 ? (
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-16 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-3xl font-bold text-gray-800">No Stories Yet</h2>
              <button
                onClick={() => setShowCreateBlog(true)}
                className="mt-6 bg-teal-700 text-white px-6 py-3 rounded-full hover:bg-teal-800 transition"
              >
                Share Your Story
              </button>
            </div>
          ) : (
            /* Feed List */
            <div className="max-w-xl mx-auto space-y-6">
              {blogs.map((blog) => {
                // SIMPLIFIED: Clean, direct fallback assignments
                const displayName = blog.user_id?.name || "Anonymous";
                const isOwner = currentUser?._id && String(currentUser._id) === String(blog.user_id?._id || blog.user_id);

                return (
                  <div key={blog._id} className="bg-white rounded-3xl shadow-md overflow-hidden">
                    {/* User Info Header */}
                    <div className="flex items-center justify-between px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 grid place-items-center font-bold uppercase">
                          {displayName[0]}
                        </div>
                        <h2 className="font-semibold text-gray-900 leading-tight">{displayName}</h2>
                      </div>

                      {/* Options Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenu(activeMenu === blog._id ? null : blog._id)}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <FaEllipsisH className="text-gray-600" />
                        </button>

                        {activeMenu === blog._id && (
                          <div className="absolute right-0 top-10 w-28 bg-white rounded-md shadow-md border border-gray-200 z-20 py-1 text-xs text-gray-700">
                            {isOwner ? (
                              <>
                                <button 
                                  onClick={() => { setSelectedBlogForEdit(blog); setActiveMenu(null); }}
                                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                                >
                                  <FaEdit size={12} /> Edit
                                </button>
                                <button
                                  onClick={() => { handleDelete(blog._id); setActiveMenu(null); }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"
                                >
                                  <FaTrash size={12} /> Delete
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => { navigator.clipboard.writeText(window.location.href); setActiveMenu(null); alert("Link copied!"); }}
                                className="w-full text-left px-3 py-2 hover:bg-gray-100"
                              >
                                Copy Link
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Blog Image */}
                    {blog.image && (
                      <img
                        src={`http://localhost:9005/assets/${blog.image}`}
                        alt="Travel"
                        className="w-full h-96 object-cover"
                      />
                    )}

                    {/* Description & Date */}
                    <div className="p-5 text-sm">
                      <p className="text-gray-700">
                        <span className="font-semibold text-gray-900 mr-2">{displayName}</span>
                        {blog.description}
                      </p>
                      {blog.createdAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(blog.createdAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <CreateBlog isOpen={showCreateBlog} onClose={() => setShowCreateBlog(false)} onBlogCreated={fetchBlogs} />
      <UpdateBlog isOpen={Boolean(selectedBlogForEdit)} blog={selectedBlogForEdit} onClose={() => setSelectedBlogForEdit(null)} onUpdate={fetchBlogs} />
    </>
  );
};

export default Blogs;