import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import logo from "../../img/nivalulogo.jpg";

export const AddClients = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [authClientId, setAuthClientId] = useState(null);

  useEffect(() => {
    if (authClientId) {
      navigate(`/updateInfo/${authClientId}`);
    }
  }, [authClientId, navigate]);

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
            <p className="text-muted">Create a new client account</p>
          </div>
          <form>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control form-control-user"
                placeholder="Email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control form-control-user"
                placeholder="Password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-user btn-block w-100"
              onClick={async () => {
                const newClient = await actions.addUser(inputEmail, inputPassword);

                if (newClient) {
                  setAuthClientId(newClient.id);
                }

                setInputEmail("");
                setInputPassword("");
              }}
            >
              Create Client
            </button>
          </form>
          <hr />
          <Link to="/" style={{ textDecoration: "none" }}>
            <span
                className="small text-center d-block"
                style={{ color: "#ff5722", fontWeight: "bold" }}
            >
                Or Go Back
            </span>
        </Link>
        </div>
      </div>
    </div>
  );
};
