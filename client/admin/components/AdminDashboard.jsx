import { useState, useEffect, useCallback } from "react";
import {
  FaMapMarkerAlt,
  FaNewspaper,
  FaComment,
  FaUsers,
} from "react-icons/fa";

import api from "../../src/api/axios";

function StatCard({ title, count, subtitle, Icon, gradient }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md">
      <div className={`bg-gradient-to-r ${gradient} p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white text-sm font-medium mb-1">
              {title}
            </p>

            <h2 className="text-white text-4xl font-bold">
              {count}
            </h2>

            <p className="text-white/80 text-xs mt-2">
              {subtitle}
            </p>
          </div>

          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Icon className="text-white text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState({
    destinations: 0,
    news: 0,
    blogs: 0,
    users: 0,
  });

  const fetchDashboard = useCallback(async () => {
    try {
    const responses = await Promise.all([
      api.get("/destination/all-destinations"),
      api.get("/news/all-news"),
      api.get("/blog/all-blogs"),
      api.get("/review/all-reviews")
    ]);

    console.log(responses);

    const [destinations, news, blogs, reviews] = responses;

    console.log(destinations);
    console.log(news);
    console.log(blogs);

    setStats({
      destinations: destinations.data.data.length,
      news: news.data.data.length,
      blogs: blogs.data.data.length,
      reviews: reviews.data.data.length,
    });
  } catch (error) {
    console.error(error);
  }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const cards = [
    {
      title: "Destinations",
      count: stats.destinations,
      subtitle: "Total destinations",
      icon: FaMapMarkerAlt,
      gradient: "from-blue-600 to-blue-400",
    },
    {
      title: "News",
      count: stats.news,
      subtitle: "Published news",
      icon: FaNewspaper,
      gradient: "from-red-600 to-red-400",
    },
    {
      title: "Blogs",
      count: stats.blogs,
      subtitle: "Published blogs",
      icon: FaComment,
      gradient: "from-green-600 to-green-400",
    },
    {
      title: "Reviews",
      count: stats.reviews,
      subtitle: "Reviews from the users",
      icon: FaUsers,
      gradient: "from-purple-600 to-purple-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 p-8 text-white shadow-lg">
        <p className="text-white/70 text-sm font-medium mb-1">
          Welcome back, Admin
        </p>

        <h2 className="text-3xl font-bold mb-2">
          BatoSanjaal Dashboard
        </h2>

        <p className="text-white/70 text-sm max-w-md">
          Manage BatoSanjaal's content, destinations, news, blogs, and users
          all in one place.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            count={card.count}
            subtitle={card.subtitle}
            Icon={card.icon}
            gradient={card.gradient}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;