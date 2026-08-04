import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaArrowLeft,
} from "react-icons/fa";
import api from "../../api/axios";



const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          `/destination/${id}`
        );

        console.log("Destination response:", response.data);

        const destinationData =
          response.data?.data?.destination ||
          response.data?.destination ||
          response.data?.data ||
          response.data;

        setDestination(destinationData);
      } catch (error) {
        console.error(
          "Destination loading error:",
          error.response?.data || error.message
        );

        setDestination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
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
  region,
  description,
  image,
  location,
  category = "Tourist Destination",
  rating = 4.0,
  price= "Updating soon",
} = destination;

const longitude = location?.coordinates?.[0];
const latitude = location?.coordinates?.[1];
  

  const stars = Math.round(rating || 0);

  return (
    <div className="min-h-screen bg-[#faf9f7] pb-16 lg:pb-20">

      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-black hover:!bg-transparent"
        >
          <FaArrowLeft />
          Back to Destinations
        </button>
      </div>

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <div className="relative w-full h-[260px] sm:h-[350px] rounded-2xl overflow-hidden">
          <img
            src={`${image}`}
            alt={name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <span className="bg-teal-600 text-xs px-3 py-1 rounded-full">
              {category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold mt-2">{name}</h1>

            <div className="flex items-center gap-2 text-sm mt-1">
              <FaMapMarkerAlt />
              {region}

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
              Entry Fee: {price}
            </div>
          </div>


          {/* WHAT YOU CAN DO */}
          <div className="p-2">
            <h2 className="text-lg font-semibold">What You Can Do Here</h2>
            <div className="flex flex-wrap gap-3 mt-3">
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
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* QUICK INFO */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-4">Quick Info</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Region</span>
              <span>{region}</span>
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
              <span>{price}</span>
            </div>
          </div>

          {/* GETTING THERE */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2">Getting There</h2>
            <p className="text-sm text-gray-600">
              Located in {region}, Nepal. Accessible by taxi, public bus,
              or private vehicle.
            </p>

            <p className="text-xs text-gray-400 mt-2">
              📍 {latitude}, {longitude}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;