import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import RestaurantCategorySelector from "./setrestaurantcategory"; // Import as default

export const Crudrestaurante = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

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
                            <Link to={"/restaurant/" + item.id}>
                                <button style={{ backgroundColor: "white", border: "0px" }}>
                                    {/* Icon for restaurant details */}
                                </button>
                            </Link>
                            <Link to={"/edit/restaurant/" + item.id}>
                                <button style={{ backgroundColor: "white", border: "0px" }}>
                                    {/* Icon for edit restaurant */}
                                </button>
                            </Link>
                            <button onClick={() => actions.removeRestaurant(item.id)} style={{ backgroundColor: "white", border: "0px" }}>
                                {/* Icon for delete restaurant */}
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
                    <button onClick={handleSaveRestaurantCategories} className="btn btn-success mt-2">
                        Save Categories
                    </button>
                </>
            )}
        </>
    );
};