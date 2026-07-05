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
import { NavLink } from "react-router-dom";

function Navbar() {
    const isLoggedIn = !!localStorage.getItem("token");
    const navClass = ({ isActive }) =>
    isActive
        ? "flex items-center gap-2 px-2 py-1 rounded-xl bg-teal-600 text-white"
        : "flex items-center gap-2 px-2 py-1 rounded-xl text-slate-600 hover:bg-gray-200 transition";
    const [menuOpen,setMenuOpen] =useState(false);

    return(
        <nav className="relative w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center gap-1 "> 
                        <img src={logo} alt="SajiloBato Logo" className="w-16 h-16 object-contain"/>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-gray-900 leading-none">BatoSanjaal</h1>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                            <NavLink to="/" className={navClass}>
                            <FaHome/> <span>Home</span></NavLink>
                            <NavLink to="/destinations" className={navClass}>
                            <FaMapMarkedAlt/><span>Destinations</span></NavLink>
                            <NavLink to="/blogs" className={navClass}>
                            <FaFileSignature/> <span>Blogs</span></NavLink>
                            <NavLink to="/news" className={navClass}>
                            <FaNewspaper/> <span>News</span></NavLink>
                            <NavLink to="/chatbot" className={navClass}>
                            <FaRobot/> <span>Chatbot</span> </NavLink>
                            {/* AUTH CONDITIONAL */}
                            {isLoggedIn ? (
                                <NavLink to="/profile" className={navClass}>
                                    <FaUserCircle/> <span>Profile</span>
                                </NavLink>
                            ) : (
                                <div className="flex gap-2">
                                    <NavLink to="/login" className="px-3 py-1 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition">
                                        Sign In
                                    </NavLink>
                                    <NavLink to="/register" className="px-3 py-1 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition">
                                        Sign Up
                                    </NavLink>
                                </div>
                            )}
                    </div>
                     {/*Mobile menu  */}
                    <button className="md:hidden ml-auto text-2xl text-slate-700" 
                    onClick={()=> setMenuOpen(!menuOpen)}>
                        {menuOpen? <FaTimes/> : <FaBars/>}
                    </button>
                    {menuOpen && (
                        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
                                <NavLink to="/" className={navClass}>
                                <FaHome/> <span>Home</span></NavLink>
                                <NavLink to="/destinations" className={navClass}>
                                <FaMapMarkedAlt/><span>Destinations</span></NavLink>
                                <NavLink to="/blogs" className={navClass}>
                                <FaFileSignature/> <span>Blogs</span></NavLink>
                                <NavLink to="/news" className={navClass}>
                                <FaNewspaper/> <span>News</span></NavLink>
                                <NavLink to="/chatbot" className={navClass}>
                                <FaRobot/> <span>Chatbot</span> </NavLink>
                                {isLoggedIn ? (
                                    <NavLink to="/profile" className={navClass}>
                                        <FaUserCircle/> <span>Profile</span>
                                    </NavLink>
                                ) : (
                                    <>
                                        <NavLink to="/login" className="px-3 py-1 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition">
                                            Sign In
                                        </NavLink>
                                        <NavLink to="/register" className="px-3 py-1 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition">
                                            Sign Up
                                        </NavLink>
                                    </>
                                )}
                        </div>
                    )}

                </div>
            </div>
        </nav>

    );
}
export default Navbar;
