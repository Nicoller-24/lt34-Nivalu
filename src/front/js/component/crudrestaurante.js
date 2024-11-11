import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import RestaurantCategorySelector from "./setrestaurantcategory"; // Import as default
import { jwtDecode } from "jwt-decode";


export const Crudrestaurante = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
    const [authRestaurantId, setAuthRestaurantId] = useState(null);

    // Decodifica el token al cargar el componente para obtener el `restaurant_id`
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
            {!store.restaurant_auth && <Navigate to="/restauranteselect" />}
            {store.restaurant_auth && (
                <button onClick={salir} type="button" className="btn btn-primary">
                    volver
                </button>
            )}
            <Link to={"/signup/restaurants"}>
                <button onClick={() => (store.restaurant_auth = false)} type="button" className="btn btn-primary">
                    crear nuevo restaurante
                </button>
            </Link>

            <Link to={"/reservationsRestaurant"}>
                <button onClick={() => store.restaurant_auth = false} type="button" className="btn btn-primary">
                    active reservations
                </button>
            </Link>


            <ul className="list-group">
                {store.restaurants.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        <div className="d-flex">
                            <img
                                src={item.image_url}
                                style={{ width: "150px", height: "150px", borderRadius: "150px", objectFit: "cover" }}
                                alt="Restaurant"
                            />
                            <div style={{ marginLeft: "10px", display: "flex", flexDirection: "column", padding: "5px" }}>
                                <h3>{item.name}</h3>
                                <p>{item.location}</p>
                                <p>{item.phone_number}</p>
                                <p>{item.email}</p>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            <Link to={`/restaurant/${item.id}`}>
                                    <button style={{ backgroundColor: "white", border: "0px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16" style={{ marginRight: "25px" }}>
                                            <path fillRule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5"/>
                                            <path fillRule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0z"/>
                                        </svg>
                                    </button>
                            </Link>
                            <Link to={`/edit/restaurant/${item.id}`}>
                                    <button style={{ backgroundColor: "white", border: "0px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16" style={{ marginRight: "25px" }}>
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                        </svg>
                                    </button>
                                </Link>
                            <button onClick={() => actions.removeRestaurant(item.id)} style={{ backgroundColor: "white", border: "0px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-trash-fill">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                    </svg>
                                </button>
                            <button onClick={() => setSelectedRestaurantId(item.id)} style={{ backgroundColor: "white", border: "0px" }}>
                                Select Categories
                            </button>
                        </div>
                    </li>
                ))}
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