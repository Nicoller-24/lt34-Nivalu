import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavbarClient } from "./navbarclient";

const ClientDetails = ({ clientId }) => {
    const [clientData, setClientData] = useState(null);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const params = useParams();

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
    };

    const fetchClient = () => {
        fetch(`${process.env.BACKEND_URL}/api/client/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setClientData(data);
            })
            .catch((error) => {
                console.error("Error loading client:", error);
            });
    };

    useEffect(() => {
        fetchClient();
    }, [clientId]);

    return (
        <>
            <NavbarClient id={params.id} onToggle={handleToggleOffcanvas} />
            <div
                className="page-content"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "2rem",
                    backgroundColor: "#f4f8fb",
                    minHeight: "100vh",
                    transition: "margin-left 0.3s ease-in-out",
                    marginLeft: isOffcanvasOpen ? "300px" : "0",
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",
                        fontFamily: "Nunito, sans-serif",
                        color: "#012970",
                    }}
                >
                    Client Details
                </h1>

                <div
                    style={{
                        padding: "1rem",
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 10px",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                    }}
                >
                    {clientData ? (
                        <>
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    fontFamily: "Nunito, sans-serif",
                                    color: "#333",
                                }}
                            >
                                {clientData.name} {clientData.last_name}
                            </h3>
                            <p
                                style={{
                                    fontFamily: "Nunito, sans-serif",
                                    color: "#555",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                <strong style={{ color: "rgba(1, 41, 112, 0.6)" }}>Email:</strong> {clientData.email}
                            </p>
                            <p
                                style={{
                                    fontFamily: "Nunito, sans-serif",
                                    color: "#555",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                <strong style={{ color: "rgba(1, 41, 112, 0.6)" }}>ID:</strong> {clientData.identification_number}
                            </p>
                            <p
                                style={{
                                    fontFamily: "Nunito, sans-serif",
                                    color: "#555",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                <strong style={{ color: "rgba(1, 41, 112, 0.6)" }}>Phone:</strong> {clientData.phone_number}
                            </p>
                            <p
                                style={{
                                    fontFamily: "Nunito, sans-serif",
                                    color: "#555",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                <strong style={{ color: "rgba(1, 41, 112, 0.6)" }}>Status:</strong>{" "}
                                {clientData.is_active ? "Active" : "Inactive"}
                            </p>
                        </>
                    ) : (
                        <p
                            style={{
                                fontFamily: "Nunito, sans-serif",
                                color: "#555",
                            }}
                        >
                            No client data found.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ClientDetails;
