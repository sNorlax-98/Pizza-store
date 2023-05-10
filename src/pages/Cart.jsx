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
  const clearCart = () => {
    axios.delete("http://localhost:5000/cart").then((res) => {
      setdata([]);
    });
  };
  const getTotal = () => {
    let total = 0;
    data.map((item) => {
      total += item.price;
    });
    return total;
  };
  const handleRemove = (_id) => {
    axios
      .delete(`http://localhost:5000/cart/${_id}`)
      .then((res) => {
        setdata(data.filter((item) => item._id !== _id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="cart-controls">
        <button className="button">checkout</button>
        <button className="button" onClick={clearCart}>
          clear cart
        </button>
      </div>
      <div className="cart-total">
        <h3>Total: ₹{getTotal()}</h3>
      </div>
      <div className="cart-card-group card-group">
        {data.map((item) => {
          return (
            <div className="card">
              <img src={item.imgUrl} className="card-img" alt="..." />
              <h5 className="card-title"></h5>
              <div className="btn-group">
                <h5 className="item">{item.name} </h5>
                <h5 className="item">₹{item.price}</h5>
                <h5 className="item">catogory: {item.categories}</h5>
                <div className="button-div">
                  <button
                    className="button"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
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
