import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, Navigate } from "react-router-dom";
import { NavbarAdmin } from "./navbaradmin";

export const Oneadmin = () => {
    const { store } = useContext(Context);
    const params = useParams();
    const [admin, setAdmin] = useState({});
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
    };

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/api/admins/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setAdmin(data);
            })
            .catch((error) => console.error("Error fetching admin data:", error));
    }, [params.id]);

    return (
        <>
            {store.admin_auth ? null : <Navigate to="/adminlogin" />}
            <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
                <NavbarAdmin id={params.id} onToggle={handleToggleOffcanvas} />

                <div
                    className="page-content"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        padding: "2rem 2rem",
                        transition: "margin-left 0.3s ease-in-out",
                        marginLeft: isOffcanvasOpen ? "300px" : "0",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "2rem",
                            fontFamily: "Nunito, sans-serif",
                            color: "#012970",
                            paddingTop: "4rem",
                        }}
                    >
                        Profile
                    </h1>

                    <div style={{ display: "flex", gap: "20px" }}>
                        {/* Columna izquierda: Foto de perfil */}
                        <div
                            style={{
                                width: "30%",
                                height: "25%",
                                padding: "1rem",
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 10px",
                                borderRadius: "10px",
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                            }}
                        >
                            {admin.image_url && (
                                <img
                                    src={admin.image_url}
                                    alt={admin.name}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginBottom: "1rem",
                                    }}
                                />
                            )}
                            <h3
                                style={{
                                    fontSize: "1.2rem",
                                    fontFamily: "Nunito, sans-serif",
                                    color: "#333",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {admin.name}
                            </h3>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontFamily: "Nunito, sans-serif",
                                    color: "#555",
                                }}
                            >
                                Administrator
                            </p>
                        </div>

                        {/* Columna derecha: Detalles */}
                        <div
                            style={{
                                flex: 1,
                                padding: "1rem",
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 10px",
                                borderRadius: "10px",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    fontFamily: "Nunito, sans-serif",
                                    color: "#333",
                                }}
                            >
                                Admin Details
                            </h3>
                            <div style={{ marginBottom: "1rem" }}>
                                <p style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                                    <strong
                                        style={{
                                            width: "120px",
                                            color: "rgba(1, 41, 112, 0.6)",
                                            fontFamily: "Nunito, sans-serif",
                                        }}
                                    >
                                        User Name:
                                    </strong>
                                    <span style={{ fontFamily: "Nunito, sans-serif", color: "#555" }}>
                                        {admin.user_name}
                                    </span>
                                </p>
                                <p style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                                    <strong
                                        style={{
                                            width: "120px",
                                            color: "rgba(1, 41, 112, 0.6)",
                                            fontFamily: "Nunito, sans-serif",
                                        }}
                                    >
                                        Email:
                                    </strong>
                                    <span style={{ fontFamily: "Nunito, sans-serif", color: "#555" }}>
                                        {admin.email}
                                    </span>
                                </p>
                            </div>

                            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                                <Link to={`/edit/admins/${params.id}`}>
                                    <button
                                        style={{
                                            padding: "0.5rem 1rem",
                                            backgroundColor: "#e75b1e",
                                            color: "#fff",
                                            borderRadius: "5px",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit Profile
                                    </button>
                                </Link>
                                <Link to={`/admins/list/${params.id}`}>
                                    <button
                                        style={{
                                            padding: "0.5rem 1rem",
                                            backgroundColor: "#6c757d",
                                            color: "#fff",
                                            borderRadius: "5px",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Go Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
