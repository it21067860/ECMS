import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPatient from "./pages/RegisterPatient";
import ViewPatients from "./pages/ViewPatients";
import Navbar from "./components/Navbar"; // ✅ Import the Navbar
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Land from "./pages/landing";
import RegisterHome from "./pages/homeManage";
import ViewHome from "./pages/ViewHomeManage";


const App = () => {
  return (
    <div style={{ marginTop: "-3.5rem" }}>
      <Router>
        <Navbar /> {/* ✅ Global Navbar */}
        <Routes>
          {/* Routes from the first code snippet */}
          <Route path="/" element={<Land />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/view-patients" element={<ViewPatients />} />
          
          <Route path="/register-Home" element={<RegisterHome />} />
          <Route path="/view-Home" element={<ViewHome />} />*/
      
          <Route path="/register-doner" element={<RegisterUser />} />


          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Register />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/land" element={<Land />} />
          

          {/* Routes from the second code snippet */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;