import { useState, useEffect, useCallback } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEyeSlash,
  FaNewspaper,
} from "react-icons/fa";

import api from "../../src/api/axios";


function NewsManager() {

  const [news, setNews] = useState([]);

  const [showModal, setShowModal] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        publisherName: "",
        image: null,
    });

    const fetchNews = useCallback (async () => {
      try{
        const response = await api.get("/news/all-news");

         console.log(response.data); // Entire API response
    console.log(response.data.data);
    
        setNews (response.data.data || response.data);
      } catch (error){
        console.error("Error Fetching news:", error);
      }
    }, []);

    useEffect (() => {
      fetchNews();
    }, [fetchNews]);

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
            title: "",
            description: "",
            location: "",
            publisherName: "",
            image: null,
        });

        setShowModal(true);

    };

    const handleEdit = (article) => {

        setEditingId(article._id);

        setFormData(article);

        setSelectedImage(article.image);

        setShowModal(true);

    };

    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this news?")) return;
    
      try {
        await api.delete(`/news/delete/${id}`);
    
        setNews((prev) => prev.filter((item) => item._id !== id));
    
        alert("News deleted successfully.");
      } catch (error) {
        console.error(error);
        alert("Failed to delete news.");
      }
    };
    
    
    const handleSave = async () => {
      try {
        const form = new FormData();
    
        form.append("title", formData.title);
        form.append("description", formData.description);
        form.append("location", formData.location);
        form.append("publisherName", formData.publisherName);
    
        if (selectedImage && typeof selectedImage !== "String") {
          form.append("image", selectedImage);
        }

        if (editingId === null) {
          // Create News
          await api.post("/news/create-news", form);
          alert("News created successfully.");
        } else {
          // Update News
          await api.put(`/news/update-news/${editingId}`, form);
          alert("News updated successfully.");
        }
    
        // Refresh the news list
        await fetchNews();
    
        // Close modal
        setShowModal(false);
    
        // Reset everything
        setEditingId(null);
        setSelectedImage(null);
    
        setFormData({
          title: "",
          description: "",
          location: "",
          publisherName: "",
          image: null,
        });
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      }
    };

    

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">News Articles</h1>

          <p className="text-gray-500 mt-1">{news.length} Articles</p>
        </div>

        <button 
         onClick={handleAddClick}
        className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition">
          <FaPlus />
          New Article
        </button>
      </div>

      <div className="space-y-2">
        {news.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition p-5 flex items-center justify-between"
          >
            <div className="flex gap-5">
              {/* Image */}


              {
              item.image ? (
                <img
                  src={`${item.image}`}
                  alt={item.title}
                  className="w-24 h-24 rounded-xl object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FaNewspaper className="text-4xl text-gray-400" />
                </div>
              )}

              {/* Text */}

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{item.title}</h2>

                </div>

                <p className="text-gray-600 mt-2">{item.description}</p>

                <div className="flex gap-2 mt-3 text-sm">
                  <span className="text-teal-700">{item.location}</span>•
                  <span className="text-gray-500">{item.publisherName}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className="flex gap-4">
              <button className="text-gray-600 hover:text-orange-600">
                <FaEyeSlash size={20} />
              </button>

              <button 
              onClick={() => handleEdit(item)}
              className="text-blue-600 hover:text-blue-800">
                <FaEdit size={20} />
              </button>

              <button 
              onClick={() => handleDelete(item._id)}
              className="text-red-500 hover:text-red-700">
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">

  <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

    {/* Header */}

    <div className="flex justify-between items-center border-b p-6">

      <h2 className="text-3xl font-bold">

        {editingId === null ? "New Article" : "Edit Article"}

      </h2>

      <button
        onClick={() => setShowModal(false)}
        className="text-3xl text-gray-500 hover:text-black"
      >
        ×
      </button>

    </div>

    {/* Form */}

    <form
      onSubmit={(e) => e.preventDefault()}
      className="p-6 space-y-6"
    >

      {/* Image */}

      <div>

        <label className="block text-sm font-semibold mb-2">
          News Image
        </label>

        <label
          htmlFor="newsImage"
          className="border-2 border-dashed border-gray-300 rounded-xl h-52 flex items-center justify-center cursor-pointer hover:border-teal-600 transition overflow-hidden"
        >

          {selectedImage ? (

            <img
              src={
                typeof selectedImage === "string"
                  ? selectedImage
                  : URL.createObjectURL(selectedImage)
              }
              alt="Preview"
              className="w-full h-full object-cover"
            />

          ) : (

            <div className="text-center">

              <p className="text-gray-500">
                Click to upload image
              </p>

              <p className="text-sm text-gray-400 mt-2">
                JPG, PNG (Max 5MB)
              </p>

            </div>

          )}

        </label>

        <input
          id="newsImage"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

      </div>

      {/* Title */}

      <div>

        <label className="block text-sm font-semibold mb-2">
          Article Title
        </label>

        <input
          type="text"
          value={formData.title}
          onChange={(e)=>
            setFormData({
              ...formData,
              title:e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-3"
          placeholder="Enter article title"
        />

      </div>

      {/* Category + Location */}


        <div>

          <label className="block text-sm font-semibold mb-2">
            Location
          </label>

          <input
            type="text"
            value={formData.location}
            onChange={(e)=>
              setFormData({
                ...formData,
                location:e.target.value
              })
            }
            className="w-full border border-gray-300 rounded-xl p-3"
            placeholder="Kathmandu"
          />

        </div>

      {/* Publisher */}

      <div>

        <label className="block text-sm font-semibold mb-2">
          Publisher Name
        </label>

        <input
          type="text"
          value={formData.publisherName}
          onChange={(e)=>
            setFormData({
              ...formData,
              publisherName:e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-3"
          placeholder="Tourism Board"
        />

      </div>

      {/* Description */}

      <div>

        <label className="block text-sm font-semibold mb-2">
          Description
        </label>

        <textarea
          rows={6}
          value={formData.description}
          onChange={(e)=>
            setFormData({
              ...formData,
              description:e.target.value
            })
          }
          className="w-full border border-gray-300 rounded-xl p-3 resize-none"
          placeholder="Write article description..."
        />

      </div>

      {/* Buttons */}

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
          {editingId === null ? "Save Article" : "Update Article"}
        </button>

      </div>

    </form>

  </div>

</div>

      )}
    </>
  );
}

export default NewsManager;