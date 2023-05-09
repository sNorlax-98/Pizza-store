import React from "react";
import "../App.css";
import { useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

const Login = () => {
  const [regestered, setRegestered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSign = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    redirect("/home");
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", { name, email, password })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {regestered ? (
        <div>
          <h1 className="login-text">Login</h1>
          <div className="inputs">
            <input
              placeholder="Enter email"
              className="input-field"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              placeholder="Enter password"
              className="input-field"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="buttons">
            <button onClick={handleSign} className="button sign-in">
              Sign In
            </button>
            <button
              className="button sign-up"
              onClick={() => {
                setRegestered(!regestered);
              }}
            >
              Sign Up
            </button>
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
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <input
              className="input-field"
              placeholder="Enter email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              className="input-field"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <div className="buttons">
              <button className="button sign-up" onClick={handleSignUp}>
                Sign Up
              </button>
              <button
                className="button sign-in"
                onClick={() => {
                  setRegestered(!regestered);
                }}
              >
                Go to sign-in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
