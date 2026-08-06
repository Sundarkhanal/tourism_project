import { useState, useEffect, useCallback } from "react";
import api from "../../src/api/axios";
import { FaEdit, FaMapMarkerAlt, FaPlus, FaTrash } from "react-icons/fa";


function DestinationManager() {
  const [destinations, setDestinations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    category: "",
    latitude: "",
    longitude: "",
    description: "",
    image: null,
  });

  const categoryOptions = [
    "Mountain",
    "Lake",
    "Temple",
    "Heritage",
    "Adventure",
    "National Park",
  ];

 const fetchDestinations = useCallback (async () => {
      try{
        const response = await api.get("/destination/all-destinations");
        setDestinations (response.data.data || response.data);
      } catch (error){
        console.error("Error Fetching Destinations:", error);
      }
    }, []);

    useEffect (() => {
      fetchDestinations();
    }, [fetchDestinations]);


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
      name: "",
      region: "",
      category: "",
      latitude: "",
      longitude: "",
      description: "",
      image: null,
    });
    setShowModal(true);
  };

  const handleEdit = (destination) => {
    setEditingId(destination._id);
    setFormData(destination);
    setSelectedImage(destination.image);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this destination?")) return;
    
      try {
        await api.delete(`/destination/delete/${id}`);
    
        setDestinations((prev) => prev.filter((item) => item._id !== id));
    
        alert("Destination deleted successfully.");
      } catch (error) {
        console.error(error);
        alert("Failed to delete Destination.");
      }
    };

   const handleSave = async () => {
      try {
        const form = new FormData();
    
        form.append("name", formData.name);
        form.append("region", formData.region);
        form.append("category", formData.category);
        form.append("latitude", formData.latitude);
        form.append("longitude", formData.longitude);
        form.append("description", formData.description);
    
        if (selectedImage && typeof selectedImage !== "String") {
          form.append("image", selectedImage);
        }

        if (editingId === null) {
          // Create News
          await api.post("/destination/create-destinations", form);
          alert("Destination created successfully.");
        } else {
          // Update News
          await api.put(`/destination/update/${editingId}`, form);
          alert("Destination updated successfully.");
        }
    
        // Refresh the news list
        await fetchDestinations();
    
        // Close modal
        setShowModal(false);
    
        // Reset everything
        setEditingId(null);
        setSelectedImage(null);
    
        setFormData({
           name: "",
      region: "",
      category: "",
      latitude: "",
      longitude: "",
      description: "",
      image: null,
        });
      } catch (error) {
        console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  console.log("Errors:", error.response?.data?.errors);
        console.error(error);
        alert("Something went wrong.");
      }
    };


  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Destinations</h1>
          <p className="text-gray-500 mt-1">{destinations.length} Destinations</p>
        </div>

        <button
          onClick={handleAddClick}
          className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <FaPlus />
          New Destination
        </button>
      </div>

      <div className="space-y-2">
        {destinations.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition p-5 flex items-center justify-between gap-6"
          >
            <div className="flex gap-5">
              {item.image ? (
                <img
                  src={`${item.image}`}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-4xl text-gray-400" />
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
                    {item.category || "Uncategorized"}
                  </span>
                </div>

                <p className="text-gray-600 mt-2 max-w-2xl">{item.description}</p>

                <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                  <span className="text-teal-700 font-medium">{item.region}</span>
                  <span>Lat: {item.latitude}</span>
                  <span>Lng: {item.longitude}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 shrink-0">
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
                {editingId === null ? "New Destination" : "Edit Destination"}
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
                <label className="block text-sm font-semibold mb-2">Destination Image</label>

                <label
                  htmlFor="destinationImage"
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

                <input
                  id="destinationImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-3"
                    placeholder="Pokhara"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-3 bg-white"
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Region</label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-3"
                    placeholder="Gandaki"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Latitude</label>
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-3"
                    placeholder="28.2096"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Longitude</label>
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-3"
                    placeholder="83.9856"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-3 resize-none"
                  placeholder="Write destination description..."
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
                  {editingId === null ? "Save Destination" : "Update Destination"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default DestinationManager;