import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../app.css";

const Cart = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/cart").then((res) => {
      setdata(res.data);
    });
  }, []);
  return (
    <>
      <Header />
      <div className="cart-card-group card-group">
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

export default Cart;
