import React, { useState, useEffect, useCallback } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import BlogCard from "./BlogCard";
import CreateBlog from "./CreateBlog";
import UpdateBlog from "./UpdateBlog";

const Blogs = () => {
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [selectedBlogForEdit, setSelectedBlogForEdit] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

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

    const token = localStorage.getItem("token");

    if (!token) return;

    const loadUser = async () => {
      try {
        const response = await api.get("/auth/me");
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, [fetchBlogs]);
  
  const handleShareStory = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setShowCreateBlog(true);
  };

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
      <section className="bg-gray-50 py-0 mb-6 min-h-screen">
        <div className="w-full">
          {/* Hero Header */}
          <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-yellow-500 py-6 md:py-8 mb-10 shadow-lg px-4">
            <div className="max-w-xl mx-auto flex flex-row items-center justify-between gap-4 w-full">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Travel Feed</h1>
                <p className="text-white/90 mt-1 text-sm md:text-base">Discover Nepal through real traveler stories</p>
              </div>
              <button 
                onClick={handleShareStory}
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
                onClick={handleShareStory}
                className="mt-6 bg-teal-700 text-white px-6 py-3 rounded-full hover:bg-teal-800 transition"
              >
                Share Your Story
              </button>
            </div>
          ) : (
            /* Feed List */
            <div className="max-w-xl mx-auto space-y-8">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  currentUser={currentUser}
                  onDelete={handleDelete}
                  onEdit={setSelectedBlogForEdit}
                />
              ))}
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