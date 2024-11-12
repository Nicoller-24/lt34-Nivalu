import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const ListOfRestaurants = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategory, setSelectedCategory] = useState(""); // State to store selected category

    // Load categories only once on component mount
    useEffect(() => {
        actions.loadSomeDataCategory(); // Load categories
        actions.loadSomeData(); // Load restaurants
    }, []); // Empty dependency array to ensure this only runs once

    // Filter restaurants based on selected category
    const filteredRestaurants = selectedCategory
        ? store.restaurants.filter(restaurant => 
            restaurant.categories.some(category => category.name === selectedCategory)
          )
        : store.restaurants;

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="container">
            <h1 className="m-5">Restaurants</h1>

            {/* Dropdown to select category */}
            <div className="form-group">
                <label htmlFor="categorySelect">Filter by Category:</label>
                <select 
                    id="categorySelect"
                    className="form-control" 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                >
                    <option value="">All Categories</option>
                    {store.categories && store.categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>

            {/* Display filtered restaurants */}
            <div className="row flex-row flex-nowrap" style={{ overflowX: "auto" }}>
                {filteredRestaurants && filteredRestaurants.map((restaurant, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <img
                                src={restaurant.image_url || "https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1"}
                                alt={restaurant.name}
                                className="card-img-top"
                                style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{restaurant.name}</h5>
                                <p className="card-text">
                                    <strong>Location:</strong> {restaurant.location} <br />
                                    <strong>Phone Number:</strong> {restaurant.phone_number}
                                </p>
                                <Link to={`/aboutRestaurants/?id_restaurant=${restaurant.id}`}>
                                    <button className="btn btn-primary">Book your table now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Link to="/">
                <button className="btn btn-primary my-5">Back home</button>
            </Link>
        </div>
    );
};