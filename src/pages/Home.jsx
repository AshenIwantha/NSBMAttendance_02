import React, { useState, useEffect } from "react";

import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";

import { ToastContainer, toast } from "react-toastify";

import { db, storage } from "../firebase.config";

import { collection, addDoc } from "firebase/firestore";
import moment from "moment";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const year = new Date().getFullYear();

  let time = moment().unix();
  const studentName = localStorage.getItem("email");

  const handleAttendClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const docRef = await addDoc(collection(db, "attendance"), {
              studentName: studentName,
              time: time,
              location: { latitude, longitude },
              // location: { latitude: 6.820841, longitude: 80.040477}
            });

            setLoading(false);
            toast.success("Attendance successfully recorded!");
          } catch (err) {
            setLoading(false);
            toast.error("Failed to record attendance!");
          }
        },
        (error) => {
          setLoading(false);
          toast.error("Failed to get user's location!");
          console.error(error);
        }
      );
    } else {
      setLoading(false);
      toast.error("Geolocation is not supported by your browser!");
    }
  };

  return (
    <Helmet title={"Home"}>
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
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 392px)",
          display: "grid",
          placeItems: "center",
        }}
      >
        {" "}
        <button className="button" onClick={handleAttendClick}>
          Mark Attendance
        </button>
      </div>
    </Helmet>
  );
};

export default Home;
