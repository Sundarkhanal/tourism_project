import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import './App.css';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/Home" element={<Home/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App;
