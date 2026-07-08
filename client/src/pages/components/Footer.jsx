import React, { useState } from "react";
import logo from "../../assets/logo.png";

import {
  FaShieldAlt,
  FaAmbulance,
  FaFire,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#071923] text-white">
      {/* Add the same max-width and padding as navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-bold ">
                <img src={logo} alt="SajiloBato Logo" className="w-16 h-16 object-contain"/>
              </div>
              <h2 className="text-2xl font-bold">
                BatoSanjaal
              </h2>
            </div>

            <p className="text-gray-300 text-base">
              Your trusted companion for exploring the beauty of
              Nepal. Discover hidden gems, plan your journey,
              and create unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="pt-4">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-300 text-base">
              <li className="hover:text-white cursor-pointer transition">
                Home
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Destinations
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Travel Blog
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Travel News
              </li>
              <li className="hover:text-white cursor-pointer transition">
                AI Assistant
              </li>
              <li className="hover:text-white cursor-pointer transition">
                My Profile
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div className="pt-4">
            <h3 className="text-2xl font-serif font-bold mb-6">
              Emergency Contacts
            </h3>

            <ul className="space-y-2 text-gray-300 text-base">
              <li className="flex items-center gap-4">
                <FaShieldAlt />
                <span>Police: 100</span>
              </li>

              <li className="flex items-center gap-4">
                <FaAmbulance />
                <span>Ambulance: 102</span>
              </li>

              <li className="flex items-center gap-4">
                <FaFire />
                <span>Fire Brigade: 101</span>
              </li>

              <li className="flex items-center gap-4">
                <FaPhoneAlt />
                <span>Tourist Police: 01-4247041</span>
              </li>

              <li className="flex items-center gap-4">
                <FaPhoneAlt />
                <span>Nepal Tourism Board: 01-4256909</span>
              </li>

              <li className="flex items-center gap-4">
                <FaPhoneAlt />
                <span>Mountain Rescue: 01-4261566</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-lg">
            &copy; 2026 BatoSanjaal. Explore Nepal with confidence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;