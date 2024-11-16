import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, Navigate } from "react-router-dom";
import SingleMapComponent from "./singlemapcompnent";
import { NavbarRestaurant } from "./navbarestaurant";

export const Singlerestaurant = () => {
    const { store } = useContext(Context);
    const params = useParams();

    const [initialPosition, setInitialPosition] = useState(null);
    const [restaurant, setRestaurant] = useState({});
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
    };

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/api/restaurant/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurant(data);
                if (data.latitude && data.longitude) {
                    setInitialPosition({
                        lat: parseFloat(data.latitude),
                        lng: parseFloat(data.longitude),
                    });
                }
            })
            .catch((error) => console.error("Error al cargar el restaurante:", error));
    }, [params.id]);

    return (
        <>  
            {store.restaurant_auth ? null : <Navigate to="/restauranteselect" />}
            <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
                <NavbarRestaurant id={params.id} onToggle={handleToggleOffcanvas} />

                <div
                    className="page-content"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        padding: "2rem 2rem",
                        transition: "margin-left 0.3s ease-in-out",
                        marginLeft: isOffcanvasOpen ? "300px" : "0", // Solo desplazamiento horizontal
                    }}
                >
                    {/* Título */}
                    <h1
                        style={{
                            fontSize: "2rem",
                            fontFamily: "Nunito, sans-serif",
                            color: "#012970",
                            paddingTop: "4rem"
                        }}
                    >
                        Profile
                    </h1>

                    {/* Contenedor de columnas */}
                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                        }}
                    >
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
                            {restaurant.image_url && (
                                <img
                                    src={restaurant.image_url}
                                    alt={restaurant.name}
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
                                {restaurant.name}
                            </h3>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontFamily: "Nunito, sans-serif",
                                    color: "#555",
                                }}
                            >
                                Restaurant
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
                                Restaurant Details
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
                                        Location:
                                    </strong>
                                    <span style={{ fontFamily: "Nunito, sans-serif", color: "#555" }}>
                                        {restaurant.location}
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
                                        Phone:
                                    </strong>
                                    <span style={{ fontFamily: "Nunito, sans-serif", color: "#555" }}>
                                        {restaurant.phone_number}
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
                                        {restaurant.email}
                                    </span>
                                </p>
                            </div>

                            {initialPosition && (
                                <div style={{ marginTop: "1rem" }}>
                                    <SingleMapComponent initialPosition={initialPosition} />
                                </div>
                            )}

                            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                                <Link to={`/restaurant/chat/${params.id}`}>
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
                                        View Chats
                                    </button>
                                </Link>
                                <Link to={`/restaurants/${params.id}`}>
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
