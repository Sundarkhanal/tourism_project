import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Profile from "./pages/profile/Profile";
import News from "./pages/News";
import Blogs from "./pages/blog/Blogs";
import Destinations from "./pages/Destinations";
import Layout from "./pages/components/Layout";
import './App.css';
import ForgotPassword from "./pages/authentication/forgotpassword";
import ResetPassword from "./pages/authentication/resetpassword";
import ActivateAccount from "./pages/authentication/ActivateAccount";
import Logout from "./pages/profile/Logout";


function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/news" element={<News/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/destinations" element={<Destinations/>} />

      </Route>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="/forgotpassword" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/activate-account" element={<ActivateAccount/>} />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App;
