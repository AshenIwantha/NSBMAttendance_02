import React, { useRef, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";

import { motion } from "framer-motion";


import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";

import useAuth from "../../custom-hooks/useAuth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";


const Header = () => {
  const headerRef = useRef(null);

  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");


  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
             
              <div>
                <h1>Attendance Managment System</h1>
              </div>
            </div>

           
            <div className="nav__icons">
              
             

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={
                    currentUser && currentUser.photoURL
                      ? currentUser.photoURL
                      : userIcon
                  }
                  alt=""
                  onClick={toggleProfileActions}
                />


{currentUser &&  <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <div className="d-flex flex-column ">
                      <span onClick={logout}>Logout</span>

                      {localStorage.getItem("email") === "admin@gmail.com" && (
                        <span>
                        
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className=" d-flex align-items-center justify-content-center flex-column">
                     
                      <Link to="/login">Login</Link>
                      
                    </div>
                  )}
                </div>}
               



              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
