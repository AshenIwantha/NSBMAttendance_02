import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";


import { useLocation } from "react-router-dom";

const Layout = () => {


  return (
    <>
     <Header />

      <div>
        <Routers />
      </div>
      <div style={{marginTop:"60px"}}><Footer/></div>
      
    </>
  );
};

export default Layout;
