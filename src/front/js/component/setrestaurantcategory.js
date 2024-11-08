import React, { useState, useEffect } from "react";

const RestaurantCategorySelector = ({ restaurantId, onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch categories from API
        fetch(`${process.env.BACKEND_URL}/api/categories`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched categories:", data); // Debugging line
                setCategories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter((id) => id !== categoryId);
            } else {
                return [...prevSelected, categoryId];
            }
        });
    };

    const saveCategories = () => {
        fetch(`${process.env.BACKEND_URL}/api/restaurant/${restaurantId}/categories`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category_ids: selectedCategories }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update categories");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Categories updated:", data);
                onCategorySelect(selectedCategories); // Update parent component with selected categories
            })
            .catch((error) => console.error("Error updating categories:", error));
    };
    if (loading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <p>Error loading categories: {error}</p>;
    }

    return (
        <div>
            <h3>Select Categories</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <label>
                            <input
                                type="checkbox"
                                value={category.id}
                                checked={selectedCategories.includes(category.id)}
                                onChange={() => handleCategoryChange(category.id)}
                            />
                            {category.name}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={saveCategories}>Save Categories</button>
        </div>
    );
};

export default RestaurantCategorySelector;