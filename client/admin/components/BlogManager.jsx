import { useState, useEffect, useCallback } from "react";
import api from "../../src/api/axios";
import { FaBookOpen, FaEdit, FaPlus, FaTrash } from "react-icons/fa";


function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    image: null,
  });

   const fetchBlogs = useCallback (async () => {
      try{
        const response = await api.get("/blog/all-blogs");
    
        setBlogs (response.data.data || response.data);
      } catch (error){
        console.error("Error Fetching Blogs:", error);
      }
    }, []);

    useEffect (() => {
      fetchBlogs();
    }, [fetchBlogs]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleAddClick = () => {
    setEditingId(null);
    setSelectedImage(null);
    setFormData({
      description: "",
      image: null,
    });
    setShowModal(true);
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      description: blog.description || "",
      image: blog.image || null,
    });
    setSelectedImage(blog.image || null);
    setShowModal(true);
  };

    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this Blog?")) return;
    
      try {
        await api.delete(`/blog/delete/${id}`);
    
        setBlogs((prev) => prev.filter((item) => item._id !== id));
    
        alert("Blog deleted successfully.");
      } catch (error) {
        console.error(error);
        alert("Failed to delete Blog.");
      }
    };

 const handleSave = async () => {
      try {
        const form = new FormData();
    
        form.append("description", formData.description);
    
        if (selectedImage && typeof selectedImage !== "String") {
          form.append("image", selectedImage);
        }

        if (editingId === null) {
          // Create News
          await api.post("/blog/create-blog", form);
          alert("Blog created successfully.");
        } else {
          // Update News
          await api.put(`/blog/update-blog/${editingId}`, form);
          alert("Blog updated successfully.");
        }
    
        // Refresh the news list
        await fetchBlogs();
    
        setShowModal(false);
    
        // Reset everything
        setEditingId(null);
        setSelectedImage(null);
    
        setFormData({
           description: "",
           image: null,
        });
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      }
    };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Blog Posts</h1>
          <p className="text-gray-500 mt-1">{blogs.length} Posts</p>
        </div>

        <button
          onClick={handleAddClick}
          className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <FaPlus />
          New Blog
        </button>
      </div>

      <div className="space-y-2">
        {blogs.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition p-5 flex items-center justify-between"
          >
            <div className="flex gap-5">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item._id}
                  className="w-24 h-24 rounded-xl object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FaBookOpen className="text-4xl text-gray-400" />
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold">
                  {item.user_id?.name || "Anonymous"}
                </h2>
                <p className="text-gray-600 mt-2 max-w-2xl">{item.description}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(item)}>
                <FaEdit size={20} />
              </button>

              <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(item._id)}>
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-6">
              <h2 className="text-3xl font-bold">
                {editingId === null ? "New Blog" : "Edit Blog"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-3xl text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Blog Image</label>

                <label
                  htmlFor="blogImage"
                  className="border-2 border-dashed border-gray-300 rounded-xl h-52 flex items-center justify-center cursor-pointer hover:border-teal-600 transition overflow-hidden"
                >
                  {selectedImage ? (
                    <img
                      src={typeof selectedImage === "string" ? selectedImage : URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-500">Click to upload image</p>
                      <p className="text-sm text-gray-400 mt-2">JPG, PNG (Max 5MB)</p>
                    </div>
                  )}
                </label>

                <input id="blogImage" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>


              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-3 resize-none"
                  placeholder="Write blog description..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border rounded-xl hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-3 bg-teal-700 text-white rounded-xl hover:bg-teal-800"
                >
                  {editingId === null ? "Save Blog" : "Update Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogManager;