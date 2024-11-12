import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import RestaurantCategorySelector from "./setrestaurantcategory";
import { jwtDecode } from "jwt-decode";
import { NavbarRestaurant } from "./navbarestaurant";

export const Crudrestaurante = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();
    
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
    const [authRestaurantId, setAuthRestaurantId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setAuthRestaurantId(decoded.sub);
        }
        actions.loadSomeData();
    }, []);

    const handleCategorySelect = (categories) => {
        setSelectedCategories(categories);
    };

    return (
        <>
            {store.restaurant_auth ? null : <Navigate to="/restauranteselect" />}
            <NavbarRestaurant id={params.id} />
            <Link to={"/signup/restaurants"}>
                <button
                    onClick={() => (store.restaurant_auth = false)}
                    type="button"
                    className="btn btn-primary"
                    style={{
                        marginBottom: "1.5rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "0.5rem 1rem",
                        fontSize: "0.9rem",
                    }}
                >
                    Crear Nuevo Restaurante
                </button>
            </Link>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
                padding: "2rem"
            }}>
                {store.restaurants.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            maxWidth: "400px",
                            transition: "transform 0.3s",
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
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
                                    color: "#333",
                                    marginBottom: "0.5rem"
                                }}>{item.name}</h3>
                                <div style={{ display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                    <p style={{ marginLeft: "8px" }}>{item.location}</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.885.511a1 1 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                    </svg>
                                    <p style={{ marginLeft: "8px" }}>{item.phone_number}</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                    </svg>
                                    <p style={{ marginLeft: "8px" }}>{item.email}</p>
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
                        {authRestaurantId === item.id && (
                            <div style={{
                                display: "flex",
                                gap: "0.5rem",
                                flexWrap: "wrap",
                                marginTop: "auto",
                                justifyContent: "space-between"
                            }}>
                                <Link to={`/restaurant/${item.id}`}>
                                    <button style={{
                                        fontSize: "0.85rem",
                                        color: "#fff",
                                        backgroundColor: "#007bff",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                        minWidth: "100px"
                                    }}>Ver Detalles</button>
                                </Link>
                                <Link to={`/edit/restaurant/${item.id}`}>
                                    <button style={{
                                        fontSize: "0.85rem",
                                        color: "#fff",
                                        backgroundColor: "#28a745",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                        minWidth: "100px"
                                    }}>Editar</button>
                                </Link>
                                <button
                                    onClick={() => actions.removeRestaurant(item.id)}
                                    style={{
                                        fontSize: "0.85rem",
                                        color: "#fff",
                                        backgroundColor: "#dc3545",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                        minWidth: "100px"
                                    }}
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={() => setSelectedRestaurantId(item.id)}
                                    style={{
                                        fontSize: "0.85rem",
                                        color: "#fff",
                                        backgroundColor: "#17a2b8",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                        minWidth: "100px"
                                    }}
                                >
                                    Seleccionar Categorías
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedRestaurantId && (
                <RestaurantCategorySelector
                    restaurantId={selectedRestaurantId}
                    onCategorySelect={handleCategorySelect}
                />
            )}
        </>
    );
};
