import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const RestaurantCategorySelector = ({ selectedCategory, onCategorySelect }) => {
    const { actions } = useContext(Context);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories when the component mounts
        fetch(process.env.BACKEND_URL + "/api/categories")
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error("Error loading categories:", error));
    }, []);

    const handleCategoryChange = (event) => {
        onCategorySelect(event.target.value); // Notify the parent component of the selected category
    };

    return (
        <div>
            <h3>Select a Category for Your Restaurant</h3>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Choose a category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};