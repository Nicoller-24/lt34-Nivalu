import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarAdmin } from "./navbaradmin";
import { Navigate } from "react-router-dom";

export const Crudocasion = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    useEffect(() => {
        actions.loadSomeDataOcasion();
    }, [store.ocasiones]);     

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
    };

    return (
        <>
            {store.admin_auth ? null : <Navigate to="/adminlogin" />}
            <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
                <NavbarAdmin id={params.id} onToggle={handleToggleOffcanvas} />

                <div
                    className="page-content"
                    style={{
                        paddingTop: "80px",
                        padding: "2rem",
                        marginLeft: isOffcanvasOpen ? "300px" : "0",
                        transition: "margin-left 0.3s ease-in-out",
                    }}
                >
                    <h1
                        style={{
                            paddingTop: "4rem",
                            fontSize: "2rem",
                            fontFamily: "Nunito, sans-serif",
                            color: "#012970",
                        }}
                    >
                        Occasions
                    </h1>
                    <div style={{ marginBottom: "2rem" }}>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/create/ocasiones/${params.id}`)}
                            style={{
                                backgroundColor: "#e75b1e",
                                border: "none",
                                padding: "0.5rem 1rem",
                                fontSize: "16px",
                                borderRadius: "5px",
                            }}
                        >
                            Create New Occasion
                        </button>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "1.5rem",
                        }}
                    >
                        {store.ocasiones.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "9px",
                                    padding: "1.5rem",
                                    boxShadow: "rgb(0 0 255 / 9%) 0px 1px 6px 4px",
                                    maxWidth: "400px",
                                    transition: "transform 0.3s ease-in-out",
                                }}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.transform = "translateY(-5px)")
                                }
                                onMouseOut={(e) =>
                                    (e.currentTarget.style.transform = "translateY(0)")
                                }
                            >
                                {/* Datos de la ocasión */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingBottom: "1rem",
                                    }}
                                >
                                    <div style={{ flex: 1, paddingRight: "1rem" }}>
                                        <h3
                                            style={{
                                                fontSize: "1.2rem",
                                                fontWeight: "bold",
                                                color: "#012970",
                                                marginBottom: "0.5rem",
                                                fontFamily: '"Poppins", sans-serif',
                                            }}
                                        >
                                            {item.name}
                                        </h3>
                                    </div>
                                    {item.image_url && (
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                            }}
                                        />
                                    )}
                                </div>
                                {/* Botones */}
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginTop: "auto",
                                    }}
                                >
                                    <button
                                        onClick={() => actions.removeOcasion(item.id)}
                                        style={{
                                            backgroundColor: "#e75b1e",
                                            color: "#fff",
                                            padding: "0.5rem 1rem",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => navigate(`/edit/ocasiones/${item.id}/${params.id}`)}
                                        style={{
                                            backgroundColor: "#6c757d",
                                            color: "#fff",
                                            padding: "0.5rem 1rem",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
