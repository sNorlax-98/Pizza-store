import React from "react";
import logo from "../assets/logo.png";
import "./components.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-div">
      <div className="logo-div">
        <img className="logo" src={logo} />
      </div>
      <div className="nav-div">
        <Link to="/cart" className="nav-link cart">
          Cart
        </Link>
        <Link to="/profile" className="nav-link profile">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Header;
