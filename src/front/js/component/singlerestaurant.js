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
            {/* Fondo de la página */}
            <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh", paddingTop: "80px" }}>
                <NavbarRestaurant id={params.id} onToggle={handleToggleOffcanvas} />
                
                {/* Contenedor principal de la página */}
                <div
                    className="page-content"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f7f8fc",
                        padding: "1.5rem",
                        borderRadius: "10px",
                        maxWidth: "800px",
                        margin: "4rem auto",
                        boxShadow: "rgba(0, 0, 255, 0.2) 0px 1px 20px 5px",
                        marginLeft: isOffcanvasOpen ? "400px" : "auto",
                        transition: "margin-left 0.3s ease",
                    }}
                >
                    {/* Imagen a la izquierda */}
                    {restaurant.image_url && (
                        <img
                            src={restaurant.image_url}
                            alt={restaurant.name}
                            style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: "1.5rem",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                            }}
                        />
                    )}
                    
                    {/* Información a la derecha */}
                    <div style={{ flex: 1 }}>
                        <h1 style={{
                            fontSize: "1.5rem",
                            color: "#333",
                            fontWeight: "bold",
                            marginBottom: "0.5rem"
                        }}>{restaurant.name}</h1>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            color: "#555",
                            marginBottom: "1rem"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#17a2b8" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                </svg>
                                <span>{restaurant.location}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#28a745" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.885.511a1 1 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                </svg>
                                <span>{restaurant.phone_number}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c757d" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                </svg>
                                <span>{restaurant.email}</span>
                            </div>
                        </div>

                        {initialPosition && (
                            <div style={{ width: "100%", marginBottom: "1rem" }}>
                                <SingleMapComponent
                                    initialPosition={initialPosition}
                                />
                            </div>
                        )}

                        <div style={{ display: "flex", gap: "1rem" }}>
                            <Link to={`/restaurant/chat/${params.id}`}>
                                <button style={{
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "5px",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease"
                                }}>
                                    View Chats
                                </button>
                            </Link>
                            <Link to={`/restaurants/${params.id}`} style={{ color: "#007bff", textDecoration: "none" }}>
                                or Go Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
