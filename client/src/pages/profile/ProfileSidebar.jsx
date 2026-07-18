import React from "react";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaShieldAlt,
  FaPen,
  FaUser,
} from "react-icons/fa";

const ProfileSidebar = ({
  user,
  favoriteCount = 0,
  postCount = 0,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="space-y-6">

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border">

        {/* Cover */}
        <div className="h-20 bg-gradient-to-r from-cyan-100 via-gray-100 to-yellow-100"></div>

        {/* Avatar */}
        <div className="flex justify-center -mt-12">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-teal-700 border-4 border-white flex items-center justify-center text-4xl font-bold text-white shadow-md">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="px-6 pb-6 text-center">

          <h2 className="text-3xl font-bold mt-3">
            {user?.name || "User"}
          </h2>

          <p className="text-gray-500 mt-2 break-all">
            {user?.email}
          </p>

          <div className="flex justify-center items-center gap-2 mt-3 text-teal-700">
            <FaShieldAlt />
            <span className="font-medium">
              {user?.role || "User"}
            </span>
          </div>

        </div>
      </div>

      {/* Account Card */}
      <div className="bg-white rounded-2xl shadow-md border p-6">

        <h3 className="text-2xl font-bold mb-5">
          Account
        </h3>

        <div className="flex items-center gap-3 mb-5">

          <FaEnvelope className="text-gray-500" />

          <p className="text-gray-600 break-all">
            {user?.email}
          </p>

        </div>

        <div className="flex items-center gap-3">

          <FaCalendarAlt className="text-gray-500" />

          <p className="text-gray-600">
            Joined{" "}
            {user?.joinedDate || "Jun 2026"}
          </p>

        </div>

      </div>


    
    </div>
  );
};

export default ProfileSidebar;