import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Restaurantselect = () => {
  const { store, actions } = useContext(Context);

  return (
    <div
      style={{
        backgroundColor: "#f4f8fb",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="text-center"
        style={{
          gap: "20px",
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{
			 fontFamily: "Nunito, sans-serif",
			 color: "#012970",
		}}>Are you already part of Nivalu?</h1>
        <div
          className="button-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <Link to="/signup/restaurants" style={{ width: "100%" }}>
            <button
              style={{
				backgroundColor: "#e75b1e",
				color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 20px",
                fontSize: "16px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "300px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "rgb(233 80 14)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e75b1e")}
            >
              Create Account
            </button>
          </Link>

          <Link to="/signuprestaurant" style={{ width: "100%" }}>
            <button
              style={{
                backgroundColor: "#008CBA",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "12px 20px",
                fontSize: "16px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "300px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#007bb5")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#008CBA")}
            >
              Log In
            </button>
          </Link>
        </div>
        <Link
          to="/"
          style={{
            color: "#e75b1e",
            marginTop: "15px",
            textDecoration: "underline",
          }}
        >
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
};
