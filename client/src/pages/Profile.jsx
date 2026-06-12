import React from "react";

import { FaUser } from "react-icons/fa";

function Profile() {
  return (
    
    <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        
        {/* Profile Icon */}
        <div className="w-36 h-36 mx-auto rounded-full bg-[#dce4df] flex items-center justify-center">
          <FaUser className="text-[#23796f] text-5xl" />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-2xl md:text-3xl font- font-bold text-[#0f172a]">
          Welcome to BaatoSanjal
        </h1>

        {/* Description */}
        <p className="mt-4 text-base md:text-xl text-slate-600 leading-relaxed">
          Sign in to access your profile, favorites, and personalized recommendations.
        </p>

        {/* Button */}
        <a href="/login" className=" flex items-center  justify-center gap-3 w-fit mx-auto  px-6 py-3 mt-2 font-semibold text-white transition duration-300 rounded-2xl bg-teal-600 hover:bg-teal-700 shadow-lg">
          <FaUser />
          Sign In / Sign Up
        </a>
      </div>
    </div>
  );
}

export default Profile;