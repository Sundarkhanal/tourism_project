import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import api from "../../api/axios";

import ProfileSidebar from "./ProfileSidebar";
import Favorites from "./Favorites";
import AccountDetails from "./AccountDetails";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("favorites");
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no token, redirect to login
    if (!token) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        // Get logged-in user
        const profileRes = await api.get("/auth/me");
        setUser(profileRes.data.data);

        // Get favorites (add later)
        
      } catch (error) {
        console.error(error);
        // If token is invalid, redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token, navigate]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // User logged in - show profile
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <ProfileSidebar
            user={user}
            favoriteCount={favorites.length}
            postCount={0}
          />

          <div className="max-w-3xl w-full">
            {activeTab === "favorites" ? (
              <Favorites
                favorites={favorites}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                removeFavorite={() => {}}  //dummy function
              />
            ) : (
              <AccountDetails
                user={user}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                favoriteCount={favorites.length}
              />
            )}
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-6">
          <button
            onClick={logout}
            className="w-fit px-6 py-3 border border-red-300 text-red-600 font-medium 
                      rounded-lg flex items-center justify-center gap-2 
                      hover:bg-red-50 transition"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;