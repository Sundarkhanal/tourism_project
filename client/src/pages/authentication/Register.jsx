import React, { useState } from "react";
import { Link } from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {FaLock} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Register() {
    const navigate=useNavigate();

    const [formData, setFormData]=useState({
        email: "",
        password: "",
        address:"",
        phone:"",
        gender:"", 
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
        <div className="flex w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)]">



            {/* Right Section - Welcome */}
            <div className="w-1/2 bg-teal-700 rounded-r-[120px] flex flex-col items-center justify-center text-white p-10">
                <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>

                <p className="text-center text-sm max-w-xs mb-8">
                Register with your personal details to use all of site features
                </p>

                <button onClick={() => navigate("/login")} className="border border-white px-8 py-2 font-semibold rounded-2xl hover:bg-teal-800 shadow-lg">
                SIGN IN
                </button>
            </div>

            {/* Left Section - Form */}
            <div className="w-1/2 flex flex-col items-center justify-center p-10">
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className=" mb-1 font-medium text-center text-gray-700">Email</label>
                        <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition"/>
                    </div>
                    <div>
                        <label className=" mb-1 font-medium text-center text-gray-700">Password</label>
                        <input type="password" name="password" placeholder="Min. 6 characters" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition" />
                    </div>
                    <div>
                        <label className=" mb-1 font-medium text-center text-gray-700">Phone</label>
                        <input type="tel" name="phone" placeholder="98XXXXXXXX" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition" />
                    </div>
                    <div>
                        <label className=" mb-1 font-medium text-center text-gray-700">Address</label>
                        <input type="text" name="address" placeholder="Enter yourr address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition" />
                    </div>
                    <div>
                        <label className=" mb-1 font-medium text-center text-gray-700">Gender</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />Male
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />Female
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="gender" value="Other" checked={formData.gender === "Other"} onChange={handleChange} />Other
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="w-full px-4 py-3 font-semibold text-white transition duration-300 rounded-2xl bg-teal-600 hover:bg-teal-700 shadow-lg">Create account</button>
                </form>
            </div>

        </div>
    </div>  
    );


}

export default Register;

