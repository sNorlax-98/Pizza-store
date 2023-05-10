import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../App.css";
const Profile = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/ ";
  };
  return (
    <>
      <Header />
      <div className="card-group">
        {data.map((item) => {
          return (
            <div className="profile-card">
              <h3 style={{ color: "white" }}>Custom Name : {item.name}</h3>
              <p style={{ color: "white" }}>Costumer Email : {item.email}</p>
              <button className="button" onClick={handleSignOut}>
                sign-Out
              </button>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
