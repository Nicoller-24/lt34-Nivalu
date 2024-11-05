import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RestaurantCategorySelector } from "./setrestaurantcategory"; // Import the category selector

export const Crudrestaurante = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    // State to hold the selected category
    const [selectedCategory, setSelectedCategory] = useState("");

    function salir() {
        actions.logoutrestaurant();
        navigate("/restauranteselect");
        store.restaurant_auth = false;
    }

    useEffect(() => {
        console.log(store.restaurant_auth);
        actions.loadSomeData();
    }, []);

    // Handle the category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // Function to handle the form submission or saving the restaurant
    const handleSaveRestaurant = () => {
        if (selectedCategory) {
            // Assuming actions.saveRestaurant takes a restaurant object with category
            actions.saveRestaurant({ category: selectedCategory });
            navigate("/restaurants"); // Navigate after saving
        } else {
            alert("Please select a category for the restaurant.");
        }
    };

    return (
        <>
            {store.restaurant_auth ? null : <Navigate to="/restauranteselect" />}
            {store.restaurant_auth ? (
                <button onClick={() => salir()} type="button" className="btn btn-primary">
                    volver
                </button>
            ) : null}
            <Link to={"/signup/restaurants"}>
                <button onClick={() => store.restaurant_auth = false} type="button" className="btn btn-primary">
                    crear nuevo restaurante
                </button>
            </Link>

            <ul className="list-group">
                {store.restaurants.map((item, index) => {
                    return (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            <div className="d-flex">
                                <img
                                    src={item.image_url}
                                    style={{ width: "150px", height: "150px", borderRadius: "150px", objectFit: "cover" }}
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
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Add the RestaurantCategorySelector component */}
            <RestaurantCategorySelector
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
            />

            {/* Button to save restaurant, triggering save action */}
            <button onClick={handleSaveRestaurant} className="btn btn-success">
                Save Restaurant
            </button>
        </>
    );
};