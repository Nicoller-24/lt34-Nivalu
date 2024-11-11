import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import RestaurantCategorySelector from "./setrestaurantcategory"; // Import as default
import { jwtDecode } from "jwt-decode";
import { NavbarRestaurant } from "./navbarestaurant";
import { useParams } from "react-router-dom";
import "../../styles/crudrestaurant.css";


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

    function salir() {
        actions.logoutrestaurant();
        navigate("/restauranteselect");
        store.restaurant_auth = false;
    }

    useEffect(() => {
        actions.loadSomeData();
    }, []);

    // Handle category selection from RestaurantCategorySelector
    const handleCategorySelect = (categories) => {
        setSelectedCategories(categories);
    };

    // Save selected categories for the restaurant
    const handleSaveRestaurantCategories = () => {
        if (selectedCategories.length > 0 && selectedRestaurantId) {
            actions.setRestaurantCategory(selectedRestaurantId, selectedCategories);
            setSelectedRestaurantId(null); // Close the category selector after saving
            navigate("/restaurants");
        } else {
            alert("Please select at least one category for the restaurant.");
        }
    };
    return (
        <>
            {store.restaurant_auth ? null : <Navigate to="/restauranteselect" />}
            <NavbarRestaurant id={params.id} />
            <Link to={"/signup/restaurants"}>
                <button onClick={() => (store.restaurant_auth = false)} type="button" className="btn btn-primary">
                    Crear Nuevo Restaurante
                </button>
            </Link>

            <ul className="restaurant-list">
                {store.restaurants.map((item, index) => {
                    return (
                        <li key={index} className="restaurant-item">
                            <div className="restaurant-info">
                                <img
                                    src={item.image_url}
                                    className="restaurant-image"
                                    alt={`${item.name}`}
                                />
                                <div className="restaurant-details">
                                    <h3>{item.name}</h3>
                                    <div className="restaurant-location">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                        </svg>
                                        <p>{item.location}</p>
                                    </div>
                                    <div className="restaurant-contact">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.885.511a1 1 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                        </svg>
                                        <p>{item.phone_number}</p>
                                    </div>
                                    <div className="restaurant-email">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                        </svg>
                                        <p>{item.email}</p>
                                    </div>
                                </div>
                            </div>
                            {authRestaurantId === item.id && (
                                <div className="restaurant-actions">
                                    <Link to={`/restaurant/${item.id}`}>
                                        <button className="action-button">View Details</button>
                                    </Link>
                                    <Link to={`/edit/restaurant/${item.id}`}>
                                        <button className="action-button">Edit</button>
                                    </Link>
                                    <button onClick={() => actions.removeRestaurant(item.id)} className="action-button">
                                        Delete
                                    </button>
                                    <button onClick={() => setSelectedRestaurantId(item.id)} style={{ backgroundColor: "white", border: "0px" }}>
                                         Select Categories
                                    </button>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            {selectedRestaurantId && (
                <>
                    <RestaurantCategorySelector
                        restaurantId={selectedRestaurantId}
                        onCategorySelect={handleCategorySelect}
                    />
                </>
            )}
        </>
    );
};