import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import logo from "../../img/nivalulogo.jpg";
import { Link } from "react-router-dom";

export const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Function to handle login
  const sendData = (e) => {
    e.preventDefault();

    actions.loginClient(email, password).then((success) => {
      if (success) {
        navigate(`/listOfRestaurants/${store.sessionUserId}`);
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f8fb",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="card-body">
          <div className="text-center mb-3">
            <img
              src={logo}
              alt="Nivalu Logo"
              style={{
                width: "100px",
                height: "auto",
                marginBottom: "10px",
              }}
            />
            <p className="text-muted">Log in to your account</p>
          </div>
          <form className="user" onSubmit={sendData}>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control form-control-user"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control form-control-user"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-user btn-block w-100"
            >
              Log In
            </button>
          </form>
          <hr />
          <Link to="/" className="link-orange">
            <button
              type="button"
              className="btn btn-secondary btn-user btn-block w-100"
            >
              Go Back
            </button>
          </Link>
          <Link to="/adduser" className="link-orange">
            <span className="small">Don't have an account? Sign up!</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
