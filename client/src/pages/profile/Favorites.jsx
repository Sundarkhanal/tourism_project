import React from "react";
import {
  FaHeart,
  FaUser,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaPen, 
} from "react-icons/fa";

const Favorites = ({
  favorites = [],
  activeTab,
  setActiveTab,
  removeFavorite,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border">

      {/* Tabs */}
      <div className="flex items-center gap-8 px-8 pt-6 border-b overflow-x-auto">

        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex items-center gap-2 pb-4 whitespace-nowrap transition ${
            activeTab === "favorites"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-500 hover:text-teal-700"
          }`}
        >
          <FaHeart />

          My Favorites

          <span className="bg-teal-700 text-white text-xs px-2 py-1 rounded-full">
            {favorites.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("addReview")}
          className={`flex items-center gap-2 pb-4 whitespace-nowrap transition ${
            activeTab === "addReview"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-500 hover:text-teal-700"
          }`}
        >
          <FaPen />
          Write Review
        </button>


        <button
          onClick={() => setActiveTab("account")}
          className={`flex items-center gap-2 pb-4 whitespace-nowrap transition ${
            activeTab === "account"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-500 hover:text-teal-700"
          }`}
        >
          <FaUser />
          Account Details
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-8 pt-8">

        <h2 className="text-3xl font-bold">
          Saved Destinations
        </h2>

        <span className="text-gray-500">
          {favorites.length} saved
        </span>

      </div>

      {/* Favorite List */}
      <div className="p-8 space-y-5">

        {favorites.length === 0 ? (
          <div className="text-center py-20">

            <FaHeart className="mx-auto text-5xl text-gray-300 mb-4" />

            <h3 className="text-xl font-semibold">
              No Favorites Yet
            </h3>

            <p className="text-gray-500 mt-2">
              Your saved destinations will appear here.
            </p>

          </div>
        ) : (
          favorites.map((place) => (
            <div
              key={place._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Left */}
              <div className="flex items-center w-full">

                {/* Image */}
                <div className="w-full sm:w-28 h-28 bg-gray-100 flex-shrink-0">

                  {place.image ? (
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      <FaMapMarkerAlt className="text-4xl text-gray-400" />
                    </div>
                  )}

                </div>

                {/* Details */}
                <div className="flex-1 px-5 py-4">

                  <h3 className="text-xl font-semibold">
                    {place.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-2">

                    <div className="flex items-center gap-1 text-gray-500">

                      <FaMapMarkerAlt className="text-sm" />

                      <span>{place.location}</span>

                    </div>

                    <span className="bg-yellow-400 text-black text-sm px-3 py-1 rounded-full">
                      {place.category || "Destination"}
                    </span>

                  </div>

                </div>

              </div>

              {/* Delete Button */}
              <div className="px-6 py-4">

                <button
                  onClick={() => removeFavorite(place._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrashAlt size={20} />
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Favorites;