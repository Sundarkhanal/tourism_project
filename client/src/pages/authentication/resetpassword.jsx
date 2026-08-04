import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import api from "../../api/axios";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const urlToken = searchParams.get("token");
    console.log("Token:", urlToken);

    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Replace with your backend endpoint
      await api.post("/auth/reset-password", {
        token,
        newpassword: password,
      });

      toast.success("Password reset successfully.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-5">

      <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-xl py-10 px-8 md:px-12 md:py-10">

        {/* Back Arrow */}
        <Link
          to="/forgot-password"
          className="inline-flex items-center text-gray-500 hover:text-teal-600 transition"
        >
          <FaArrowLeft className="text-lg" />
        </Link>

        {/* Reset Icon */}
        <div className="flex justify-center mt-4">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
            <FaLock className="text-2xl text-teal-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mt-4">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-800 text-white py-3 rounded-2xl shadow-lg font-semibold transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;