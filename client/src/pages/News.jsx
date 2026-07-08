import React, { useEffect, useState } from "react";
import {
  FaNewspaper,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews([
      {
        id: 1,
        featured: true,
        title: "Devkota Sadak Nirman",
        description:
          "Road construction work is underway with traffic diversions in place.",
        location: "Kathmandu",
        date: "May 29, 2026",
        image:
          "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200",
      },
      {
        id: 2,
        title: "New Direct Flight Routes to Pokhara",
        description:
          "International direct flights are expected to begin soon.",
        location: "Pokhara",
        date: "May 23, 2026",
        image:
          "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800",
      },
    ]);
  }, []);

  const featuredNews = news.find((item) => item.featured);
  const normalNews = news.filter((item) => !item.featured);

  return (
    <section className="bg-color-background py-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-4xl font-bold text-color-foreground">
            <FaNewspaper className="text-teal-700" />
            Travel News
          </h1>
          <p className="text-color-foreground/70 mt-2">
            Latest updates, and news about Nepal tourism
          </p>
        </div>

        {/* Featured News */}
        {featuredNews && (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden grid lg:grid-cols-2 mb-10">
            <img
              src={featuredNews.image}
              alt={featuredNews.title}
              className="w-full h-72 object-cover"
            />

            <div className="p-6 flex flex-col justify-center">
              <span className="text-gray-500 text-sm font-medium">
                Featured News
              </span>

              <h2 className="text-3xl font-bold mt-4">
                {featuredNews.title}
              </h2>

              <p className="text-gray-600 mt-3">
                {featuredNews.description}
              </p>

              <div className="flex gap-5 mt-6 text-gray-500">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {featuredNews.location}
                </span>

                <span className="flex items-center gap-1">
                  <FaCalendarAlt />
                  {featuredNews.date}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* News Cards (NO CATEGORY) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {normalNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-2 text-sm">
                  {item.description}
                </p>

                <div className="flex justify-between mt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    {item.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <FaCalendarAlt />
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default News;