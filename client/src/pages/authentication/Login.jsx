import React, { useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { toast } from 'sonner';

function Login(){
    const navigate = useNavigate();
    const [formData, setFormData]=useState({
        email: "",
        password: "",
    });
    
    const handleChange=(e)=>{   //called whenever input changes
        setFormData({
            ...formData,        //spread operator,copies all values that exists
            [e.target.name]:e.target.value,     //'email='abcd@email'
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", formData);
            console.log("Login Success:", response.data);
            // Save JWT token returned by the backend
            if (response.data.data) {
            localStorage.setItem("token", response.data.data);
            }

            console.log("Saved Token:", localStorage.getItem("token"));
            toast.success("Login Successful!");
            navigate("/");
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Login Failed";
            toast.error(error.message);
        }
    };

    return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
    <div className="flex w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

        {/* Left Section - Form */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10">
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className="mb-2 font-medium text-center text-gray-700">Email</label>
                    <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-gray-100 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition" />
                </div>
                <div>
                    <label className=" mb-2 font-medium text-center text-gray-700">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-gray-100 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition" />
                </div>
                <button type="submit" className="w-full px-4 py-3 font-semibold text-white transition duration-300 rounded-2xl bg-teal-600 hover:bg-teal-700 shadow-lg">Login</button>
            </form>
            <div className="mt-1 flex flex-col items-center justify-between sm:flex-row">
                <Link to="/forgotpassword" className=" text-sm font-semibold text-slate-900 hover:underline">
                    Forgot Password? 
                </Link>
            </div>
        </div>

    {/* Right Section - Welcome */}
    <div className="w-1/2 bg-teal-700 rounded-l-[120px] flex flex-col items-center justify-center text-white p-10">
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>

        <p className="text-center text-sm max-w-xs mb-8">
        Enter your details to use all of site features
        </p>

        <button onClick={() => navigate("/register")} className="border border-white px-8 py-2 font-semibold rounded-2xl hover:bg-teal-800 shadow-lg">
        SIGN UP
        </button>
    </div>

    </div>
    </div>  
    );
}

export default Login;