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
import { Link } from "react-router-dom";

function Navbar() {
    const [menuOpen,setMenuOpen] =useState(false);
    return(
        <nav className="relative w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-1 "> 
                        <img src={logo} alt="SajiloBato Logo" className="w-16 h-16 object-contain"/>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-gray-900 leading-none">BaatoSanjal</h1>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                            <Link to="/" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaHome/> <span>Home</span></Link>
                            <Link to="/destinations" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaMapMarkedAlt/><span>Destinations</span></Link>
                            <Link to="/blogs" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaFileSignature/> <span>Blogs</span></Link>
                            <Link to="/news" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaNewspaper/> <span>News</span></Link>
                            <Link to="/chatbot" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaRobot/> <span>Chatbot</span> </Link>
                            <Link to="/profile" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaUserCircle/> <span>Profile</span></Link>
                    </div>
                     {/*Mobile menu  */}
                    <button className="md:hidden ml-auto text-2xl text-slate-700" 
                    onClick={()=> setMenuOpen(!menuOpen)}>
                        {menuOpen? <FaTimes/> : <FaBars/>}
                    </button>
                    {menuOpen && (
                        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
                                <Link to="/" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaHome/> <span>Home</span></Link>
                                <Link to="/destinations" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaMapMarkedAlt/><span>Destinations</span></Link>
                                <Link to="/blogs" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaFileSignature/> <span>Blogs</span></Link>
                                <Link to="/news" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaNewspaper/> <span>News</span></Link>
                                <Link to="/chatbot" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaRobot/> <span>Chatbot</span> </Link>
                                <Link to="/profile" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaUserCircle/> <span>Profile</span></Link>
                        </div>
                    )}

                </div>
            </div>
        </nav>

    );
}
export default Navbar;
