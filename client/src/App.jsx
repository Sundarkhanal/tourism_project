import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./pages/components/Navbar"
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import './App.css';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Navbar" element={<Navbar/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        

      </Routes>
    </BrowserRouter>
  )
}

export default App;
