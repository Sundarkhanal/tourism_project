import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Login(){
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

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);  //prints value in console until api is connected
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
                <div className="flex flex-col items-center mt-0">
                    <img src={logo} alt="Sahayatri Logo" className="w-36 h-36 object-contain"/>
                    <h2 className="mb-5 text-2xl font-bold text-center text-slate-900">
                        Welcome to BaatoSanjal</h2>
                </div>
                <p className="text-center text-slate-500 mb-5 text-sm sm:text-base">
                    Sign in to continue
                </p>
                <button type="button" className="w-full px-4 py-3 font-semibold border border-gray-300 transition duration-300 rounded-2xl bg-white hover:bg-slate-50 shadow-lg flex items-center justify-center gap-2">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4 object-contain"/>
                Continue with Google
                </button>
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-[1px] bg-gray-300"></div>
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-[1px] bg-gray-300"></div>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className="block mb-1 font-medium text-center text-gray-700">Email</label>
                        <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-center text-gray-700">Password</label>
                        <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition" />
                    </div>
                    <button type="submit" className="w-full px-4 py-3 font-semibold text-white transition duration-300 rounded-2xl bg-teal-600 hover:bg-teal-700 shadow-lg">Login</button>
                </form>
                <div className="mt-1 flex flex-col items-center justify-between sm:flex-row">
                    <Link to="/forgot-password" className=" text-sm font-semibold text-slate-900 hover:underline">
                            Forgot Password? 
                        </Link>
                    <p className="text-sm text-center text-slate-500 ">
                        Don't have an account? {""}
                        <Link to="/Register" className="font-semibold text-slate-900 hover:underline">
                            Sign up 
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;