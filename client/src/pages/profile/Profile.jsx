import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser,FaSignOutAlt} from "react-icons/fa";
import api from "../../api/axios";

import ProfileSidebar from "./ProfileSidebar";
import Favorites from "./Favorites";
import AccountDetails from "./AccountDetails";

const Profile = () => {
  const navigate = useNavigate();
//  const token = "test-token";
  const token = localStorage.getItem("token");
  console.log("Token:", localStorage.getItem("token"));

  const [activeTab, setActiveTab] = useState("favorites");
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      try {
        const profileRes = await api.get("/user/profile");
        setUser(profileRes.data);

        const favoriteRes = await api.get("/favorites");
        setFavorites(favoriteRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, [token]);
  

   const logout = () => {
    navigate("/logout");
  };

  // User not logged in
  if (!token) {
    return (
      <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">

          <div className="w-36 h-36 mx-auto rounded-full bg-[#dce4df] flex items-center justify-center">
            <FaUser className="text-[#23796f] text-5xl" />
          </div>

          <h1 className="mt-8 text-3xl font-bold text-slate-900">
            Welcome to BaatoSanjal
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Sign in to access your profile, favorites, and personalized recommendations.
          </p>

          <a
            href="/login"
            className="flex items-center justify-center gap-3 w-fit mx-auto px-6 py-3 mt-8 font-semibold text-white rounded-2xl bg-teal-600 hover:bg-teal-700"
          >
            <FaUser />
            Sign In / Sign Up
          </a>

        </div>
      </div>
    );
  }

  // User logged in
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
  <ProfileSidebar
    user={user}
    favoriteCount={favorites.length}
    postCount={0}
  />

  <div>
    {activeTab === "favorites" ? (
      <Favorites
        favorites={favorites}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        removeFavorite={() => {}}  //dummy function         ...............................
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
      className="w-fit px-26 py-3 border border-red-300 text-red-600 font-medium 
                 rounded-lg flex items-center justify-center gap-2 
                 hover:bg-red-50 transition
                 "
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