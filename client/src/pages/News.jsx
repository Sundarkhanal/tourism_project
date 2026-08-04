import React, { useEffect, useState } from "react";
import {
  FaNewspaper,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

import api from "../api/axios";

const News = () => {

const [news, setNews] = useState([]);

const fetchNews = async () => {
  try {
    const response = await api.get("/news/all-news");

    // Sorting the News so that the latest is on the top
    const sortedNews = response.data.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setNews(sortedNews);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchNews();
}, []);

const featuredNews = news[0];
const normalNews = news.slice(1);

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
              <span className="text-teal-600 font-semibold">
                Latest News
              </span>
        
              <h2 className="text-3xl font-bold mt-3">
                {featuredNews.title}
              </h2>
        
              <p className="text-gray-600 mt-3">
                {featuredNews.description}
              </p>
        
              <div className="flex gap-5 mt-5 text-gray-500">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {featuredNews.location}
                </span>
        
                <span className="flex items-center gap-1">
                  <FaCalendarAlt />
                  {new Date(featuredNews.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* News Cards (NO CATEGORY) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {normalNews.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.image} // If image is a filename, use: `http://localhost:9005/uploads/${item.image}`
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
                    {new Date(item.createdAt).toLocaleDateString()}
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