import React from "react";
import { FaClock, FaInfoCircle } from "react-icons/fa";

const packages = [
  {
    id: 1,
    title: "Lumbini Spiritual Retreat",
    company: "Peace Trail Nepal",
    description:
      "A peaceful 2-day spiritual journey to the birthplace of Lord Buddha with meditation sessions.",
    duration: "2 Days / 1 Night",
    price: "NPR 12,000",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
  },
];

const FeaturedPackages = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-teal-700 font-medium">
            Curated For You
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
            Featured Packages
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Handpicked travel packages from top companies and hotels across
            Nepal.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-8">
          {packages.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />

                <span className="absolute top-4 right-4 bg-yellow-400 text-black text-sm font-semibold px-4 py-1 rounded-full">
                  {item.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-teal-700 font-medium mt-1">
                  {item.company}
                </p>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaClock />
                    <span>{item.duration}</span>
                  </div>

                  <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full hover:bg-teal-600 hover:text-white transition">
                    <FaInfoCircle />
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;