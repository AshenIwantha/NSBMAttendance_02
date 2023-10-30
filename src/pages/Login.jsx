import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import {  useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { ToastContainer, toast } from "react-toastify";

import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);



    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
     
      const user = userCredential.user;

     

      localStorage.setItem("email", user?.email )

      setLoading(false);
      toast.success("Successfully logged in");

      {localStorage.getItem("email") === "admin@gmail.com" ?  navigate("/Admin"):   navigate("/home");}


   
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }

 
  };

  return (
    <div className="login-bg">
     <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="login-container">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h2 className="login-heading mb-4">NSBM Attendance System</h2>
              <Form className="auth-form" onSubmit={signIn}>
                <FormGroup className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <button type="submit" className="login-btn">
                  Login
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
