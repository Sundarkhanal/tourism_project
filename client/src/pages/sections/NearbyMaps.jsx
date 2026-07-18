import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaLandmark,
  FaMountain,
  FaTree,
  FaWater,
  FaUtensils,
} from "react-icons/fa";

const categories = [
  "All",
  "Temple",
  "Lake",
  "Hiking",
  "Park",
  "Restaurant",
];

const legendItems = [
  {
    label: "Your Location",
    color: "bg-blue-500",
    icon: <FaMapMarkerAlt className="text-blue-500" />,
  },
  {
    label: "Temple",
    color: "bg-green-500",
    icon: <FaLandmark className="text-green-500" />,
  },
  {
    label: "Lake",
    color: "bg-cyan-500",
    icon: <FaWater className="text-cyan-500" />,
  },
  {
    label: "Hiking",
    color: "bg-orange-500",
    icon: <FaMountain className="text-orange-500" />,
  },
  {
    label: "Park",
    color: "bg-emerald-500",
    icon: <FaTree className="text-emerald-500" />,
  },
  {
    label: "Restaurant",
    color: "bg-red-500",
    icon: <FaUtensils className="text-red-500" />,
  },
];

const NearbyMap = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <section className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-4xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Nearby Sites
          </h1>

          <p className="mt-2 text-gray-600 max-w-2xl">
            Tourism sites, police stations, hospitals & ATMs within 5km
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-emerald-50 hover:border-emerald-400"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Horizontal Legend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-4 mb-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {legendItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span
                  className={`w-3 h-3 rounded-full ${item.color}`}
                ></span>

                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div
            id="galli-map"
            className="w-full h-[650px] flex items-center justify-center bg-gray-100"
          >
            <div className="text-center">
              <FaMapMarkerAlt className="text-5xl text-gray-400 mx-auto mb-4" />

              <h3 className="text-xl font-semibold text-gray-700">
                Galli Maps
              </h3>

              <p className="text-gray-500 mt-2">
                Map will appear here after integration.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-5 flex flex-wrap justify-between items-center text-sm text-gray-600">
          <p>
            Showing <span className="font-semibold">0</span> nearby places
          </p>
        </div>
      </div>
    </section>
  );
};

export default NearbyMap;