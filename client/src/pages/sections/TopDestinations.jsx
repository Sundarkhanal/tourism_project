import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const TopDestinations = () => {
  //add data from  backend
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    //Replace with an API call later


    // Temporary dummy data
    setDestinations([
      {
        _id: 1,
        name: "Kathmandu",
        description: "Ancient temples & vibrant streets",
        image:
          "https://images.unsplash.com/photo-1558799401-1dcba79834c2?w=600&q=80",
      },

    ]);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header - aligned with logo position */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-10 gap-4">
        <div>
          <p className="text-teal-700 text-sm uppercase tracking-wide">
            Popular Picks
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            Top Destinations
          </h2>
        </div>

        <Link
          to="/destinations"
          className="flex items-center gap-2 text-teal-700 hover:text-blue-700 font-medium"
        >
          View All <FaArrowRight />
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Link
            key={destination._id}
            to={`/destinations/${destination._id}`}
            className="group relative overflow-hidden rounded-xl aspect-[3/4]"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white text-xl font-bold">
                {destination.name}
              </h3>
              <p className="text-white/80 text-sm mt-1">
                {destination.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopDestinations;