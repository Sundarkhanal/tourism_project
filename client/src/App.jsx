import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Blogs from "./pages/Blogs";
import Destinations from "./pages/Destinations";
import Layout from "./pages/components/Layout";
import './App.css';
import ForgotPassword from "./pages/authentication/forgotpassword";

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
      <Route path="/forgotpassword" element={<ForgotPassword/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
