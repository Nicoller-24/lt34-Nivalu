import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { useParams } from "react-router-dom";
import { NavbarClient } from "../component/navbarclient"; 

export const ListOfRestaurants = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // Estado para controlar el offcanvas
    const params = useParams();

    // Cargar categorías y restaurantes al montar el componente
    useEffect(() => {
        actions.loadSomeDataCategory(); // Cargar categorías
        actions.loadSomeData(); // Cargar restaurantes
    }, []); // Dependencias vacías para que solo se ejecute una vez

    // Filtrar restaurantes en función de la categoría seleccionada
    const filteredRestaurants = selectedCategory
        ? store.restaurants.filter(restaurant => 
            restaurant.categories.some(category => category.name === selectedCategory)
          )
        : store.restaurants;

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Función para alternar el estado del offcanvas
    const handleToggleOffcanvas = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen); // Alternar entre abrir y cerrar
    };

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
            {/* NavbarClient */}
            <NavbarClient id={params.id} onToggle={handleToggleOffcanvas} />

            <div className="page-content" style={{
                paddingTop: "80px", 
                padding: "2rem", 
                marginLeft: isOffcanvasOpen ? "300px" : "0", 
                transition: "margin-left 0.3s ease-in-out", 
                backgroundColor: "#f4f8fb"
            }}>
                <h1
                    style={{
                        fontSize: "2rem",
                        fontFamily: "Nunito, sans-serif",        
                        color: "#012970",
                        marginBottom: "1rem",
                        paddingTop: "4rem"

                    }}
                >
                    Restaurants
                </h1>

                {/* Dropdown para seleccionar categoría */}
                <div className="form-group">
                    <label htmlFor="categorySelect">Filter by Category:</label>
                    <select 
                        id="categorySelect"
                        className="form-control" 
                        value={selectedCategory} 
                        onChange={handleCategoryChange}
                        style={{width: "28%"}}
                    >
                        <option value="">All Categories</option>
                        {store.categories && store.categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>

                {/* Mostrar restaurantes filtrados */}
                <div style={{
                    display: "grid", 
                    gridTemplateColumns: "repeat(3, 1fr)", 
                    gap: "1.5rem", 
                    marginTop: "2rem",
                }}>
                    {filteredRestaurants && filteredRestaurants.map((restaurant, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "#ffffff",
                                borderRadius: "9px",
                                padding: "2rem", // Ajustado padding a 2rem
                                boxShadow: "rgb(0 0 255 / 9%) 0px 1px 6px 4px",
                                transition: "transform 0.3s ease-in-out",
                                maxWidth: "400px", // Se ajustó para mantener las tarjetas consistentes
                                marginBottom: "2rem", // Ajuste para dar un espacio entre tarjetas
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
                                    }}>
                                        {restaurant.name}
                                    </h3>
                                    <div style={{ display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="#899bbd"
                                            className="bi bi-geo-alt-fill"
                                            viewBox="0 0 16 16"
                                            style={{ marginRight: "8px" }}
                                        >
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                        </svg>
                                        <span style={{fontFamily: '"Open Sans", sans-serif', fontSize: "14px"}}>{restaurant.location}</span>
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
                                        <span style={{fontFamily: '"Open Sans", sans-serif', fontSize: "14px"}}>{restaurant.email}</span>
                                    </div>
                                </div>
                                <img
                                    src={restaurant.image_url}
                                    alt={`${restaurant.name}`}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
                                    }}
                                />
                            </div>
                            <Link to={`/aboutRestaurants/${params.id}/?id_restaurant=${restaurant.id}`}>
                                <button 
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
                                    Book your table now
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                <Link to="/">
                    <button className="btn btn-primary my-5">Back home</button>
                </Link>
            </div>
        </div>
    );
};