import React, { useState } from "react";
import { Link } from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {FaLock} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Register() {
    const navigate=useNavigate();

    const [formData, setFormData]=useState({
        name:"",
        email: "",
        password: "",
        confirmPassword:"", 
    });
    
    const handleChange=(e)=>{   //called whenever input changes
        setFormData({
            ...formData,        //spread operator,copies all values that exists
            [e.target.name]:e.target.value,     //'email='abcd@email'
        });
    };

    const handleSubmit=(e)=>{
        e.preventDefault();

        //validation
        if(formData.password!== formData.confirmPassword){
            alert('Password do not match');
            return;
        }
        console.log("Register Data:", formData);
        alert("Registration Succesfull");
        navigate("/");
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-4 py-8">
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                <Link to="/Login" className="flex items-center gap-2 mb-4 text-x font-semibold text-gray-500">
                <FaArrowLeft/>Back to sign in</Link>
                <h2 className="mb-5 text-3xl sm:text-4xl font-bold text-center text-slate-900">
                   Create your account
                </h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className="block mb-1 font-medium text-center text-gray-700">Email</label>
                        <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition"/>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-center text-gray-700">Password</label>
                        <input type="password" name="password" placeholder="Min. 6 characters" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-center text-gray-700">Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition" />
                    </div>

                    <button type="submit" className="w-full px-4 py-3 font-semibold text-white transition duration-300 rounded-2xl bg-teal-600 hover:bg-teal-700 shadoe-lg">Create account</button>
                </form>
            </div>
        </div>
    );
}

export default Register;