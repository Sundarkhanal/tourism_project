import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../api/axios";
import { toast } from "sonner";

const ActivateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      otp,
    };

    try {
      await api.post("/auth/activate-account", data);

      toast.success("Account activated successfully!");
      navigate("/login");
    } catch (err) {
      console.log(error);
      toast.error("Failed to activate account. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);

      await api.post("/auth/resend-activate-otp", {
        email,
      });

      toast.success("A new verification code has been sent.");
    } catch (err) {
      console.log(error);
      toast.error("Failed to resend verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-xl py-12 px-8 md:px-12">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-600"
        >
          <FaArrowLeft />
          <span>Back</span>
        </Link>

        <h1 className="text-3xl font-bold mt-8">
          Activate Your Account
        </h1>

        <p className="text-gray-500 mt-2 mb-2">
          Enter the 6-digit verification code sent to
        </p>

        <p className="font-semibold text-teal-600 break-all mb-8">
          {email}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter your 6-digit OTP"
              maxLength={6}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-2xl font-semibold shadow-lg transition"
          >
            Activate Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Didn't receive the code?
          </p>

          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="font-semibold text-teal-600 hover:text-teal-700"
          >
            {loading ? "Sending..." : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;