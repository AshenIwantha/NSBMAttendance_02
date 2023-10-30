import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";

import Login from "../pages/Login";

import Admin from "../pages/Admin";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" />} />
      <Route path="home" element={<Home />} />
      <Route path="Admin" element={<Admin />} />
 

      

      <Route path="login" element={<Login />} />
     
    </Routes>
  );
};

export default Routers;
