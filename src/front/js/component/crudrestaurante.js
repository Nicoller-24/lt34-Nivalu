import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import RestaurantCategorySelector from "./setrestaurantcategory";
import { jwtDecode } from "jwt-decode";
import { NavbarRestaurant } from "./navbarestaurant";
import { Navigate } from "react-router-dom";

export const Crudrestaurante = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    
    const [authRestaurantId, setAuthRestaurantId] = useState(null);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setAuthRestaurantId(decoded.sub);
        }
        actions.loadSomeData();
    }, []);

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
    };

    const handleCategorySelect = (categoryId) => {
        console.log(`Selected category: ${categoryId}`);
    };

    return (
        <>
        {store.restaurant_auth ? null : <Navigate to="/restauranteselect" />}
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
            <NavbarRestaurant id={params.id} onToggle={handleToggleOffcanvas} />

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
                        color: "#012970"
                    }}
                >
                    Restaurants
                </h1>
                <div style={{
                    marginTop: "2rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1.5rem",
                }}>
                    {store.restaurants.map((item, index) => (
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
                            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                        >
                            {/* Datos del restaurante */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingBottom: "1rem"
                            }}>
                                <div style={{ flex: 1, paddingRight: "1rem" }}>
                                    <h3 style={{
                                        fontSize: "1.2rem",
                                        fontWeight: "bold",
                                        color: "#012970",
                                        marginBottom: "0.5rem",
                                        fontFamily: '"Poppins", sans-serif'
                                    }}>{item.name}</h3>
                                    <div style={{ display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="#899bbd"
                                            className="bi bi-geo-alt-fill"
                                            viewBox="0 0 16 16"
                                            style={{ marginRight: "8px" }} // Espacio entre ícono y texto
                                        >
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                        </svg>
                                        <span style={{fontFamily: '"Open Sans", sans-serif', fontSize: "14px"}}>{item.location}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="#899bbd"
                                            className="bi bi-envelope-fill"
                                            viewBox="0 0 16 16"
                                            style={{ marginRight: "8px" }}
                                        >
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                        </svg>
                                        <span style={{fontFamily: '"Open Sans", sans-serif', fontSize: "14px"}}>{item.email}</span>
                                    </div>
                                </div>
                                <img
                                    src={item.image_url}
                                    alt={`${item.name}`}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
                                    }}
                                />
                            </div>

                            {/* Botones */}
                            {authRestaurantId === item.id && (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(2, 1fr)", // Dos columnas
                                        gap: "0.5rem",
                                        marginTop: "auto",
                                    }}
                                >
                                    <button 
                                        onClick={() => actions.removeRestaurant(item.id)} 
                                        style={{
                                            backgroundColor: "#e75b1e",
                                            color: "#fff",
                                            padding: "0.5rem 1rem",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            textAlign: "center",
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <RestaurantCategorySelector
                                        restaurantId={item.id}
                                        onCategorySelect={handleCategorySelect}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};
