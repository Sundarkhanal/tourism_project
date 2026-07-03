import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../api/axios";

const ActivateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/activate-account", {
        email,
        otp: otp.join(""),
      });

      alert("Account activated successfully!");

      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to activate account. Please try again."
      );
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);

      // Change this endpoint if your backend uses a different one.
      await api.post("/auth/resend-otp", {
        email,
      });

      setSeconds(60);

      alert("A new verification code has been sent.");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to resend verification code."
      );
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
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-semibold bg-gray-100 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-2xl font-semibold shadow-lg transition"
          >
            Activate Account
          </button>
        </form>

        <div className="mt-6 text-center">
          {seconds > 0 ? (
            <p className="text-sm text-gray-500">
              Didn't receive the code?{" "}
              <span className="font-semibold text-teal-600">
                Resend in {seconds}s
              </span>
            </p>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;