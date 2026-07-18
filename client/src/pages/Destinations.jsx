import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../api/axios"; 
import {
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

function Destinations() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [destinationsData, setDestinationsData] = useState([]);

  // Regions from backend
  const cities = ["All", ...new Set(destinationsData.map((d) => d.region))];

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/destination/all-destinations");
      setDestinationsData(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDestinations = destinationsData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCity === "All" || item.region === selectedCity)
  );

  const handleViewDetails = (id) => {
    navigate(`/destination/${id}`);
  };

  const toggleFavorite = (id) => {
    setDestinationsData((prev) =>
      prev.map((place) =>
        place._id === id
          ? { ...place, favorite: !place.favorite }
          : place
      )
    );
  };

  return (
    <section className="bg-color-background py-6 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="flex items-center gap-3 text-4xl font-bold">
          Explore Destinations
        </h1>

        <p className="text-gray-600 mt-2">
          Discover the beauty of Nepal by city and category
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
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border rounded-xl py-1 px-4 border-gray-200 shadow bg-white cursor-pointer "
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded-xl py-1 px-4 border-gray-200 shadow bg-white cursor-pointer"
            ><option>Category Coming Soon</option>
{/*               
-------------------------------------cat required here
               */}
            </select>
          </div>

        </div>

        <div className="flex gap-3 overflow-x-auto py-8">

          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1 rounded-xl whitespace-nowrap border-gray-200 shadow transition

              ${
                selectedCity === city
                  ? "bg-teal-700 text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              {city}
            </button>
          ))}

        </div>

        {/* Cards */}
        {filteredDestinations.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3">

            {filteredDestinations.map((place) => (

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
                    {/* {place.category} */}
                    Tourist Destination
                  </span>

                  <button
                    onClick={() => toggleFavorite(place._id)}
                    className={`absolute top-4 right-4 w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300
                      ${
                        place.favorite
                          ? "bg-red-500"
                          : "bg-white"
                      }
                    `}
                  >
                    {place.favorite ? (
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

                  {/* <div className="flex items-center justify-between mt-5">

                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">
                        {place.rating}
                      </span>
                    </div>

                  </div> */}

                  <button
                    onClick={() => handleViewDetails(place._id)}
                    className="w-full mt-6 border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-teal-700 hover:text-white transition"
                  >
                    View Details
                    <FaArrowRight />
                  </button>

                </div>

              </div>

            ))}

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