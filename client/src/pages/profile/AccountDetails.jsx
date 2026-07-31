import React from "react";
import { FaHeart, FaUser,FaSignOutAlt, FaPen } from "react-icons/fa"; 

const AccountDetails = ({
  user,
  activeTab,
  setActiveTab,
  favoriteCount = 0,
  onLogout,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border">

      {/* Tabs */}
      <div className="flex items-center gap-8 px-8 pt-6 border-b overflow-x-auto">

        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex items-center gap-2 pb-4 whitespace-nowrap transition cursor-pointer ${
            activeTab === "favorites"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-500 hover:text-teal-700"
          }`}
        >
          <FaHeart />

          My Favorites

          <span className="bg-teal-700 text-white text-xs px-2 py-1 rounded-full">
            {favoriteCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("addReview")}
          className={`flex items-center gap-2 pb-4 whitespace-nowrap transition cursor-pointer ${
            activeTab === "addReview"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-500 hover:text-teal-700"
          }`}
        >
          <FaPen />
          Write Review
        </button>

        <button
          onClick={() => setActiveTab("account")}
          className={`flex items-center gap-2 pb-4 whitespace-nowrap transition cursor-pointer ${
            activeTab === "account"
              ? "text-teal-700 border-b-2 border-teal-700"
              : "text-gray-500 hover:text-teal-700"
          }`}
        >
          <FaUser />

          Account Details
        </button>
        

      </div>

      {/* Content */}

      <div className="p-8">

        <h2 className="text-3xl font-bold mb-8">
          Account Details
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Full Name */}

          <div>

            <label className="uppercase text-sm tracking-wider text-gray-500 font-semibold">
              Full Name
            </label>

            <div className="mt-3 bg-gray-100 rounded-xl px-5 py-4 text-lg font-medium">
              {user?.name || "-"}
            </div>

          </div>

          {/* Email */}

          <div>

            <label className="uppercase text-sm tracking-wider text-gray-500 font-semibold">
              Email Address
            </label>

            <div className="mt-3 bg-gray-100 rounded-xl px-5 py-4 text-lg font-medium break-all">
              {user?.email || "-"}
            </div>

          </div>

          {/* Member Since */}

          <div>

            <label className="uppercase text-sm tracking-wider text-gray-500 font-semibold">
              Member Since
            </label>

            <div className="mt-3 bg-gray-100 rounded-xl px-5 py-4 text-lg font-medium">
              {user?.joinedDate || "June 23, 2026"}
            </div>

          </div>

          {/* edit profile button*/}
          <div>

            <div className="flex justify-end items-end md:h-full">
              <button
                onClick={onLogout} 
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

      </div>

    </div>
  );
};

export default AccountDetails;