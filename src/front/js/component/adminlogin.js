import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import logo from "../../img/nivalulogo.jpg";

export const Adminlogin = () => {
  const { store, actions } = useContext(Context);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [authAdminId, setAuthAdminId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authAdminId) {
      navigate(`/admins/list/${authAdminId}`);
    }
  }, [authAdminId, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const adminData = await actions.adminlogin(inputEmail, inputPassword);
    if (adminData) {
      setAuthAdminId(adminData.admin_id);
    }
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
              alt="Logo"
              style={{
                width: "100px",
                height: "auto",
                marginBottom: "10px",
              }}
            />
            <p className="text-muted">Log in as an Administrator</p>
          </div>
          <form onSubmit={handleLogin} className="user">
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control form-control-user"
                id="Email"
                placeholder="Email"
                onChange={(e) => setInputEmail(e.target.value)}
                value={inputEmail}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control form-control-user"
                id="Password"
                placeholder="Password"
                onChange={(e) => setInputPassword(e.target.value)}
                value={inputPassword}
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
          <Link to="/">
            <button
              type="button"
              className="btn btn-secondary btn-user btn-block w-100"
            >
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
