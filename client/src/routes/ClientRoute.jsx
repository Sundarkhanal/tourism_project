import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "../pages/components/Layout";
import Home from "../pages/Home";
import Profile from "../pages/profile/Profile";
import News from "../pages/News";
import Blogs from "../pages/blog/Blogs";
import Destinations from "../pages/destination/Destinations";
import Chatbot from "../pages/Chatbot";
import DestinationDetails from "../pages/destination/DestinationDetails";

import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import ForgotPassword from "../pages/authentication/forgotpassword";
import ResetPassword from "../pages/authentication/resetpassword";
import ActivateAccount from "../pages/authentication/ActivateAccount";

export default function ClientRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destination/:id" element={<DestinationDetails />} />
                <Route path="/chatbot" element={<Chatbot />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/activate-account" element={<ActivateAccount />} />

        </Routes>
    );
}