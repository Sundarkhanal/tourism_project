import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:9005/api/v1/auth/forget-password",
        { email }
      );

      alert("Password reset link sent.");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden flex items-center justify-center px-4">

        {/* Card */}
        <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-xl py-12 px-8 md:p-10">
          <h1 className="text-3xl font-bold">
            Forgot Password?
          </h1>

          <p className="mt-2 mb-8 text-sm">
            No worries, we'll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit}>

            <label className="mb-2 font-medium text-center text-gray-700">
              Email
            </label>

            <div className="relative mb-8">

              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm sm:text-base bg-gray-100 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-800 text-white px-8 py-3 rounded-2xl shadow-lg font-semibold transition "
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>

            <Link
              to="/login"
              className="block text-center mt-6 font-semibold text-slate-900 hover:underline"
            >
              Back to Login
            </Link>

          </form>

        </div>
      </div>

  );
};

export default ForgotPassword;