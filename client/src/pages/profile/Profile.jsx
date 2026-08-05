import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";

import ProfileSidebar from "./ProfileSidebar";
import Favorites from "./Favorites";
import AccountDetails from "./AccountDetails";
import AddReviews from "./AddReviews";

const Profile = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("favorites");
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const profileRes = await api.get("/auth/me");

        const currentUser =
          profileRes.data?.data?.user ||
          profileRes.data?.data ||
          profileRes.data?.user ||
          profileRes.data ||
          {};

        setUser(currentUser);

        const savedFavorites = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );

        setFavorites(
          Array.isArray(savedFavorites)
            ? savedFavorites
            : []
        );
      } catch (error) {
        console.error(
          "Profile loading error:",
          error.response?.data || error.message
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const removeFavorite = async (destinationId) => {
    const id = String(destinationId || "");

    if (!id) {
      toast.error("Destination ID not found");
      return;
    }

    const updatedFavorites = favorites.filter((favorite) => {
      const savedDestination = favorite?.destination_id;

      const savedId =
        savedDestination &&
        typeof savedDestination === "object"
          ? savedDestination._id
          : savedDestination || favorite?._id;

      return String(savedId) !== id;
    });

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    try {
      await api.post(`/favourites/${id}`);
    } catch (error) {
      console.error(
        "Remove favorite API error:",
        error.response?.data || error.message
      );
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("favorites");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data || error.message
      );
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>

          <p className="mt-4 text-gray-600">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <ProfileSidebar
            user={user}
            favoriteCount={favorites.length}
            postCount={0}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="max-w-3xl w-full">
            {activeTab === "favorites" && (
              <Favorites
                favorites={favorites}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                removeFavorite={removeFavorite}
              />
            )}

            {activeTab === "addReview" && (
              <AddReviews
                user={user}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                favoriteCount={favorites.length}
              />
            )}

            {activeTab === "account" && (
              <AccountDetails
                user={user}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                favoriteCount={favorites.length}
                onLogout={logout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;