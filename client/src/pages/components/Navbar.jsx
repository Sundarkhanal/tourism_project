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

function Navbar() {
    const [menuOpen,setMenuOpen] =useState(false);
    return(
        <nav className="relative w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2 "> 
                        <img src={logo} alt="SajiloBato Logo" className="w-16 h-16 object-contain"/>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-gray-900 leading-none">SajiloBato</h1>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                            <a href="./Home" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaHome/> <span>Home</span></a>
                            <a href="./Destinations" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaMapMarkedAlt/><span>Destinations</span></a>
                            <a href="./Blogs" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaFileSignature/> <span>Blogs</span></a>
                            <a href="./News" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaNewspaper/> <span>News</span></a>
                            <a href="./Chatbot" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaRobot/> <span>Chatbot</span> </a>
                            <a href="./Profile" className="flex items-center gap-2 px-2 py-2 border border-transparent rounded-xl hover:bg-gray-200 transition duration-300">
                            <FaUserCircle/> <span>Profile</span></a>
                    </div>
                     {/*Mobile menu  */}
                    <button className="md:hidden ml-auto text-2xl text-slate-700" 
                    onClick={()=> setMenuOpen(!menuOpen)}>
                        {menuOpen? <FaTimes/> : <FaBars/>}
                    </button>
                    {menuOpen && (
                        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
                                <a href="./Home" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaHome/> <span>Home</span></a>
                                <a href="./Destinations" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaMapMarkedAlt/><span>Destinations</span></a>
                                <a href="./Blogs" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaFileSignature/> <span>Blogs</span></a>
                                <a href="./News" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaNewspaper/> <span>News</span></a>
                                <a href="./Chatbot" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaRobot/> <span>Chatbot</span> </a>
                                <a href="./Profile" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                                <FaUserCircle/> <span>Profile</span></a>
                        </div>
                    )}

                </div>
            </div>
        </nav>

    );
}
export default Navbar;
