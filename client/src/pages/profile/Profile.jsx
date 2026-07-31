import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import ProfileSidebar from "./ProfileSidebar";
import Favorites from "./Favorites";
import AccountDetails from "./AccountDetails";
import AddReviews from "./AddReviews";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("favorites");
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);

        // Get logged-in user
        const profileRes = await api.get("/auth/me");

        const currentUser =
          profileRes.data?.data?.user ||
          profileRes.data?.data ||
          profileRes.data?.user ||
          profileRes.data ||
          {};

        setUser(currentUser);

        const currentUserId =
          currentUser?._id || currentUser?.id;

        if (!currentUserId) {
          console.error("Logged-in user ID was not found");
          setFavorites([]);
          return;
        }

        // Get all destinations
        const destinationRes = await api.get(
          "/destination/all-destinations"
        );

        const allDestinations =
          destinationRes.data?.data?.destinations ||
          destinationRes.data?.destinations ||
          destinationRes.data?.data ||
          destinationRes.data ||
          [];

        const destinationList = Array.isArray(allDestinations)
          ? allDestinations
          : [];

        const storageKey = `favoriteIds_${currentUserId}`;
        const savedFavoriteIds = localStorage.getItem(storageKey);

        let favoriteIds = [];

        if (savedFavoriteIds) {
          try {
            const parsedIds = JSON.parse(savedFavoriteIds);

            favoriteIds = Array.isArray(parsedIds)
              ? parsedIds.map(String)
              : [];
          } catch (error) {
            console.error(
              "Could not read saved favorite IDs:",
              error
            );
          }
        }

        const savedDestinations = destinationList.filter(
          (destination) =>
            favoriteIds.includes(String(destination._id))
        );

        setFavorites(savedDestinations);
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
  }, [token, navigate]);

  const removeFavorite = async (destinationId) => {
    const id = String(destinationId || "");

    if (!id) {
      alert("Destination ID not found");
      return;
    }

    const currentUserId = user?._id || user?.id;

    if (!currentUserId) {
      alert("User ID not found");
      return;
    }

    try {
      await api.post(`/favourites/${id}`);

      const updatedFavorites = favorites.filter(
        (favorite) => String(favorite?._id) !== id
      );

      setFavorites(updatedFavorites);

      const updatedFavoriteIds = updatedFavorites
        .map((favorite) => favorite?._id)
        .filter(Boolean)
        .map(String);

      localStorage.setItem(
        `favoriteIds_${currentUserId}`,
        JSON.stringify(updatedFavoriteIds)
      );
    } catch (error) {
      console.error(
        "Remove favorite error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Could not remove favorite"
      );
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
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