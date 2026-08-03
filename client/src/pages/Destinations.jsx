import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

function Destinations() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const [destinationsData, setDestinationsData] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const savedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      return Array.isArray(savedFavorites)
        ? savedFavorites.map((item) => String(item._id))
        : [];
    } catch {
      return [];
    }
  });
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [favoriteLoadingId, setFavoriteLoadingId] = useState("");

  const cities = [
    "All",
    ...new Set(destinationsData.map((destination) => destination.region)),
  ];

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    try {
      setLoading(true);
      const destinationResponse = await api.get(
        "/destination/all-destinations"
      );
      setDestinationsData(destinationResponse.data?.data || []);

      const userResponse = await api.get("/auth/me");
      const currentUser =
        userResponse.data?.data ||
        userResponse.data?.user ||
        userResponse.data;

      const currentUserId = currentUser?._id || currentUser?.id;

      if (!currentUserId) {
        console.log("User ID not found");
        return;
      }

      setUserId(String(currentUserId));

    } catch (error) {
      console.error(
        "Page loading error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredDestinations = destinationsData.filter(
    (item) =>
      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) &&
      (selectedCity === "All" ||
        item.region === selectedCity)
  );

  const handleViewDetails = (id) => {
    navigate(`/destination/${id}`);
  };

const toggleFavorite = async (place) => {
  if (!userId) {
    alert("Please log in to save favorites!");
    navigate("/login");
    return;
  }
  const id = String(place._id);

  if (favoriteLoadingId === id) return;

  const savedFavorites = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  const isFavorite = savedFavorites.some(
    (item) => String(item._id) === id
  );

  const updatedFavorites = isFavorite
    ? savedFavorites.filter(
        (item) => String(item._id) !== id
      )
    : [...savedFavorites, place];

  localStorage.setItem(
    "favorites",
    JSON.stringify(updatedFavorites)
  );

  setFavoriteIds(
    updatedFavorites.map((item) => String(item._id))
  );

  setFavoriteLoadingId(id);

  try {
    await api.post(`/favourites/${id}`);
  } catch (error) {
    console.log(
      "Favourite API error:",
      error.response?.data || error.message
    );
    localStorage.setItem(
      "favorites",
      JSON.stringify(savedFavorites)
    );
    setFavoriteIds(
      savedFavorites.map((item) => String(item._id))
    );
  } finally {
    setFavoriteLoadingId("");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">
          Loading destinations...
        </p>
      </div>
    );
  }

  return (
    <section className="bg-color-background py-6 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="flex items-center gap-3 text-4xl font-bold">
          Explore Destinations
        </h1>

        <p className="text-gray-600 mt-2">
          Discover the beauty of Nepal by city
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-9">
          <div className="relative lg:col-span-8">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations..."
              className="w-full border rounded-xl py-1 pl-14 pr-4 border-gray-200 shadow outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          <div className="lg:col-span-2">
            <select
              value={selectedCity}
              onChange={(e) =>
                setSelectedCity(e.target.value)
              }
              className="w-full border rounded-xl py-1 px-4 border-gray-200 shadow bg-white cursor-pointer "
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto py-8">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1 rounded-xl whitespace-nowrap border-gray-200 shadow transition ${
                selectedCity === city
                  ? "bg-teal-700 text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3">
            {filteredDestinations.map((place) => {
              const isFavorite = favoriteIds.includes(
                String(place._id)
              );

              const isFavoriteLoading =
                favoriteLoadingId === String(place._id);

              return (
                <div
                  key={place._id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border-gray-200 shadow"
                >
                  <div className="relative">
                    <img
                      src={
                        place.image
                          ? `http://localhost:9005/${place.image}`
                          : "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={place.name}
                      className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                    />

                    <span className="absolute top-4 left-4 bg-teal-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Tourist Destination
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(place)
                      }
                      disabled={isFavoriteLoading}
                      className={`absolute top-4 right-4 w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer ${
                        isFavorite
                          ? "bg-red-500"
                          : "bg-white"
                      } ${
                        isFavoriteLoading
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {isFavorite ? (
                        <FaHeart className="text-white text-xl" />
                      ) : (
                        <FaRegHeart className="text-gray-700 text-xl" />
                      )}
                    </button>
                  </div>

                  <div className="p-5">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {place.name}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-500 mt-2">
                      <FaMapMarkerAlt className="text-teal-700" />
                      <span>{place.region}</span>
                    </div>

                    <p className="text-gray-600 mt-4 leading-relaxed">
                      {place.description}
                    </p>

                    <button
                      onClick={() =>
                        handleViewDetails(place._id)
                      }
                      className="w-full mt-6 border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-teal-700 hover:text-white transition"
                    >
                      View Details
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M7 12h10M10 18h4"
              />
            </svg>

            <h2 className="text-3xl font-semibold text-gray-600 mt-6">
              No destinations found
            </h2>

            <p className="text-gray-500 mt-2">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Destinations;