import React from "react";
import { FaCamera, FaHeart, FaRegComment, FaMapMarkerAlt } from "react-icons/fa";

const Blogs = () => {
  // Backend will provide blogs later
  const blogs = [];

  return (
    <section className="bg-gray-50 py-6 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="bg-gradient-to-r from-teal-700 to-green-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Travel Feed
            </h1>
            <p className="text-white/90 mt-3 text-lg">
              Discover Nepal through real traveler stories.
            </p>
          </div>

          <button className="bg-white text-teal-700 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition">
            <FaCamera />
            Share Story
          </button>
        </div>

        {/* Backend API */}
        {/*
        useEffect(() => {
          axios
            .get("YOUR_BACKEND_API")
            .then((res) => setBlogs(res.data))
            .catch((err) => console.log(err));
        }, []);
        */}

        {/* Empty State */}
        {blogs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-16 text-center">
            <div className="text-6xl mb-4">📝</div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Stories Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Be the first traveler to share your amazing experience.
            </p>

            <button className="mt-6 bg-teal-700 text-white px-6 py-3 rounded-full hover:bg-teal-800 transition">
              Share Your Story
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-3xl shadow-md overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-5">
                  <div>
                    <h2 className="font-bold text-xl">{blog.author}</h2>

                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                      <FaMapMarkerAlt />
                      <span>{blog.location}</span>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-72 md:h-[450px] object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-2xl font-bold">{blog.title}</h3>

                  <p className="text-gray-600 mt-3">
                    {blog.description}
                  </p>

                  <div className="flex gap-6 mt-6 text-gray-600">
                    <button className="flex items-center gap-2 hover:text-red-500">
                      <FaHeart />
                      Like
                    </button>

                    <button className="flex items-center gap-2 hover:text-teal-700">
                      <FaRegComment />
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;