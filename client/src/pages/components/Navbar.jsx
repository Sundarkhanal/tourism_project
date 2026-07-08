import React, { useState } from "react";
import logo from "../../assets/logo.png";

import {
FaBars,
FaTimes,
FaHome,
FaFileSignature,
FaNewspaper,
FaRobot,
FaUserCircle,
FaMapMarkedAlt
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
    const isLoggedIn = !!localStorage.getItem("token");
    const navClass = ({ isActive }) =>
    isActive
        ? "flex items-center gap-1.5 px-2 py-1 rounded-lg bg-teal-600 text-white text-sm"
        : "flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-700 hover:bg-gray-100 transition text-sm";
    const [menuOpen,setMenuOpen] =useState(false);

    return(
        <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo - using heading font */}
                    <Link to="/" className="flex items-center gap-1.5 flex-shrink-0"> 
                        <img src={logo} alt="SajiloBato Logo" className="w-10 h-10 object-contain"/>
                        <h1 className="text-lg font-heading font-bold text-gray-800 tracking-wide leading-none">
                            BatoSanjaal
                        </h1>
                    </Link>

                    {/* Desktop Navigation - using body font */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-body font-medium text-slate-700">
                        <NavLink to="/" className={navClass}>
                            <FaHome className="text-sm"/> <span>Home</span>
                        </NavLink>
                        <NavLink to="/destinations" className={navClass}>
                            <FaMapMarkedAlt className="text-sm"/><span>Destinations</span>
                        </NavLink>
                        <NavLink to="/blogs" className={navClass}>
                            <FaFileSignature className="text-sm"/> <span>Blog</span>
                        </NavLink>
                        <NavLink to="/news" className={navClass}>
                            <FaNewspaper className="text-sm"/> <span>News</span>
                        </NavLink>
                        <NavLink to="/chatbot" className={navClass}>
                            <FaRobot className="text-sm"/> <span>Chatbot</span> 
                        </NavLink>
                        {/* AUTH CONDITIONAL */}
                        {isLoggedIn ? (
                            <NavLink to="/profile" className={navClass}>
                                <FaUserCircle className="text-sm"/> <span>Profile</span>
                            </NavLink>
                        ) : (
                            <div className="flex gap-1.5 ml-1">
                                <NavLink to="/login" className="px-3 py-1 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition text-sm font-body font-medium">
                                    Sign In
                                </NavLink>
                                <NavLink to="/register" className="px-3 py-1 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition text-sm font-body font-medium">
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden ml-auto text-2xl text-slate-700 p-1" 
                    onClick={()=> setMenuOpen(!menuOpen)}>
                        {menuOpen? <FaTimes/> : <FaBars/>}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-lg p-4 space-y-1">
                        <NavLink to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-700 hover:bg-gray-100 transition text-sm font-body">
                            <FaHome/> <span>Home</span>
                        </NavLink>
                        <NavLink to="/destinations" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-700 hover:bg-gray-100 transition text-sm font-body">
                            <FaMapMarkedAlt/><span>Destinations</span>
                        </NavLink>
                        <NavLink to="/blogs" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-700 hover:bg-gray-100 transition text-sm font-body">
                            <FaFileSignature/> <span>Blog</span>
                        </NavLink>
                        <NavLink to="/news" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-700 hover:bg-gray-100 transition text-sm font-body">
                            <FaNewspaper/> <span>News</span>
                        </NavLink>
                        <NavLink to="/chatbot" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-700 hover:bg-gray-100 transition text-sm font-body">
                            <FaRobot/> <span>Chatbot</span> 
                        </NavLink>
                        {isLoggedIn ? (
                            <NavLink to="/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-700 hover:bg-gray-100 transition text-sm font-body">
                                <FaUserCircle/> <span>Profile</span>
                            </NavLink>
                        ) : (
                            <div className="flex flex-col gap-2 pt-2">
                                <NavLink to="/login" className="w-full text-center px-4 py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition font-body font-medium text-sm">
                                    Sign In
                                </NavLink>
                                <NavLink to="/register" className="w-full text-center px-4 py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition font-body font-medium text-sm">
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
export default Navbar;