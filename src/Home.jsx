import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import "./app.css";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        setData(res.data);
        console.log(data, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="card-group">
        {data.map((item) => {
          return (
            <div className="card">
              <img src={item.imgUrl} className="card-img" alt="..." />
              <h5 className="card-title"></h5>
              <div className="btn-group">
                <h5>{item.name} </h5>
                <div className="button-div">
                  <button className="button">Add to cart</button>
                  <button className="button">Remove</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Home;
