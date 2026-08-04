import { useEffect, useState } from "react";
import {
  FaNewspaper,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../api/axios";

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getNews = async () => {
      try {
        const { data } = await api.get("/news/all-news");
        const sortedNews = [...data.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNews(sortedNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    getNews();
  }, []);

  const [featuredNews, ...normalNews] = news;
  const formatDate = (date) =>
    new Date(date).toLocaleDateString();
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
        {featuredNews && (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden grid lg:grid-cols-2 mb-10">
            <div className="relative">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-75 object-cover"
              />
              <span className="absolute top-4 right-4 bg-white text-black text-sm font-semibold px-4 py-1 rounded-full">
                  Latest News
              </span>
            </div>

            <div className="p-4 flex flex-col justify-center">
              <h2 className="text-teal-700 mb-3">
                Source: {featuredNews.publisherName}
              </h2>
              <p className="text-3xl font-bold mb-3">
                {featuredNews.title}
              </p>
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
                  {formatDate(featuredNews.createdAt)}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {normalNews.map(
            ({ _id, image, title, description, location, createdAt, publisherName  }) => (
              <div
                key={_id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-xs text-teal-700 font-medium mt-1">
                    Source: {publisherName}
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">
                    {description}
                  </p>
                  <div className="flex justify-between mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt />
                      {location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt />
                      {formatDate(createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default News;