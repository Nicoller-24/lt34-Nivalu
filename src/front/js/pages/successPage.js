import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const SuccessPage = () => {
    const params = useParams();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f4f8fb",
                minHeight: "100vh",
                padding: "2rem",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    padding: "2rem",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                    maxWidth: "500px",
                    width: "100%",
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",
                        fontFamily: "Nunito, sans-serif",
                        color: "#012970",
                        marginBottom: "1rem",
                    }}
                >
                    Reservation Confirmed!
                </h1>
                <p
                    style={{
                        fontSize: "1rem",
                        fontFamily: "Nunito, sans-serif",
                        color: "#555",
                        marginBottom: "1rem",
                    }}
                >
                    Your reservation has been successfully created. Thank you for choosing us!
                </p>
                <p
                    style={{
                        fontSize: "1rem",
                        fontFamily: "Nunito, sans-serif",
                        color: "#555",
                        marginBottom: "2rem",
                    }}
                >
                    You can access and cancel your reservation in your profile.
                </p>
                <Link
                    to={`/listOfRestaurants/${params.id}`}
                    style={{
                        display: "inline-block",
                        backgroundColor: "#e75b1e",
                        color: "#fff",
                        textDecoration: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "5px",
                        fontFamily: "Nunito, sans-serif",
                        fontSize: "1rem",
                        fontWeight: "600",
                    }}
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};
