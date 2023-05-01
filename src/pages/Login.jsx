import React from "react";
import "../App.css";
import { useState } from "react";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      {loggedIn ? (
        <div>
          <h1 className="login-text">Login</h1>
          <div className="inputs">
            <input className="input-field" type="text"></input>
            <input className="input-field" type="email"></input>
            <input className="input-field" type="password"></input>
          </div>
          <div className="buttons">
            <button className="button sign-in">Sign In</button>
            <button className="button sign-up">Sign Up</button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="login-text">Sign Up</h1>
          <div className="inputs">
            <input
              className="input-field"
              placeholder="Enter Name"
              type="text"
            ></input>
            <input
              className="input-field"
              placeholder="Enter email"
              type="email"
            ></input>
            <input
              className="input-field"
              type="password"
              placeholder="Enter Password"
            ></input>
            <div className="buttons">
              <button className="button sign-up">Sign Up</button>
              <button className="button sign-in">Go to sign-in </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
