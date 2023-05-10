import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import "./app.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [veg, setVeg] = useState(false);
  useEffect(() => {
    axios
      .get(veg ? "http://localhost:5000/veg" : "http://localhost:5000")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [veg]);

  const handleSearch = () => {
    axios
      .get(`http://localhost:5000/search?name=${search}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemove = (_id) => {
    axios
      .delete(`http://localhost:5000/cart/${_id}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (name, price, categories, imgUrl, _id) => {
    axios
      .post("http://localhost:5000/cart", {
        name,
        price,
        categories,
        imgUrl,
        _id,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="hero-div">
        <div className="search-sort">
          <h3 className="hero-text">Filters</h3>
          <div className="search">
            <input
              className="search-field"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="button search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="filter">
            <ul className="filter"></ul>
            <div className="list">
              <li className="list-item">
                <input
                  type="checkbox"
                  className="filter-checkbox"
                  checked={veg}
                  onChange={(e) => setVeg(e.target.checked)}
                />
                Veg
              </li>
            </div>
          </div>
        </div>
        <div className="card-group">
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
                      onClick={() =>
                        handleAdd(
                          item.name,
                          item.price,
                          item.categories,
                          item.imgUrl,
                          item._id
                        )
                      }
                    >
                      Add to cart
                    </button>
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
      </div>
      <Footer />
    </>
  );
};

export default Home;
