import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaArrowLeft,
  FaLocationArrow,
  FaRegNewspaper,
} from "react-icons/fa";

// Dummy data
const dummyDestinations = [
  {
    id: 1,
    name: "Mero Ghar",
    city: "Lalitpur",
    category: "Heritage Site",
    rating: 4,
    description:
      "Beautiful heritage place with traditional architecture and cultural importance.",
    price: "0",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2c1a?w=1200",
    coordinates: "536.0000, 1220.0000",
    blogPosts: [
      {
        title: "Why visit Mero Ghar?",
        excerpt: "It is one of the most beautiful heritage places...",
      },
      {
        title: "History of the site",
        excerpt: "This place has deep cultural roots...",
      },
    ],
    nearby: [
      {
        name: "Patan Durbar Square",
        category: "Heritage Site",
        rating: 4.7,
      },
    ],
  },
];

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = dummyDestinations.find(
      (item) => item.id === parseInt(id)
    );

    setDestination(found);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading destination...
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Destination not found
      </div>
    );
  }

  const {
    name,
    city,
    category,
    rating,
    description,
    price,
    image,
    blogPosts = [],
    coordinates,
    nearby = [],
  } = destination;

  const stars = Math.round(rating || 0);

  return (
    <div className="min-h-screen bg-[#faf9f7]">

      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-black"
        >
          <FaArrowLeft />
          Back to Destinations
        </button>
      </div>

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <div className="relative w-full h-[350px] rounded-2xl overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              {category}
            </span>

            <h1 className="text-3xl font-bold mt-2">{name}</h1>

            <div className="flex items-center gap-2 text-sm mt-1">
              <FaMapMarkerAlt />
              {city}

              <FaStar className="text-yellow-400 ml-2" />
              {rating}/5
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* ABOUT */}
          <div className="p-2">
            <h2 className="text-lg font-semibold">About</h2>

            <p className="text-gray-600 mt-2">{description}</p>

            <div className="mt-4 inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-700">
              <FaStar className="text-teal-600 text-xs" />
              Entry: {price === "0" ? "Free" : price}
            </div>
          </div>


          {/* WHAT YOU CAN DO */}
          <div className="p-2">
            <h2 className="text-lg font-semibold">What You Can Do Here</h2>
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                "Guided Heritage Walk",
                "Photography",
                "Cultural Exploration",
                "Architecture Study",
                "Sunset Viewing",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 text-sm bg-[#f5f7f7] border border-gray-200 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* NEARBY */}
          <div className="bg-white p-5 rounded-xl border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">
              Nearby Sites in {city}
            </h2>

            {nearby.map((site, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                    <FaMapMarkerAlt className="text-teal-600" />
                  </div>

                  <div>
                    <h3 className="font-medium text-sm">{site.name}</h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full">
                        {site.category}
                      </span>

                      <span className="text-xs text-gray-600">
                        ⭐ {site.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <FaLocationArrow className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* QUICK INFO */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-4">Quick Info</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>City</span>
              <span>{city}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Category</span>
              <span>{category}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Rating</span>
              <span>{"⭐ ".repeat(stars)}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Entry Fee</span>
              <span>{price === "0" ? "Free" : price}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Blog Posts</span>
              <span>{blogPosts.length}</span>
            </div>
          </div>

          {/* GETTING THERE */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2">Getting There</h2>
            <p className="text-sm text-gray-600">
              Located in {city}, Nepal. Accessible by taxi, public bus,
              or private vehicle.
            </p>

            <p className="text-xs text-gray-400 mt-2">
              📍 {coordinates}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;