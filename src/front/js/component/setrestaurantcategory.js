import React, { useState, useEffect, useRef } from "react";

const RestaurantCategorySelector = ({ restaurantId, onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el dropdown está abierto
    const dropdownRef = useRef(null); // Referencia al dropdown para manejar clics fuera

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
                setCategories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setError(error.message);
                setLoading(false);
            });

        // Event listener para cerrar el dropdown al hacer clic fuera
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCategorySelect = (categoryId) => {
        setIsOpen(false); // Cerrar el dropdown al seleccionar una categoría
        // Guardar categoría directamente al seleccionarla
        fetch(`${process.env.BACKEND_URL}/api/restaurant/${restaurantId}/categories`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category_ids: [categoryId] }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update category");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Category updated:", data);
                onCategorySelect(categoryId); // Notificar al componente padre
                alert("Category successfully updated!");
            })
            .catch((error) => console.error("Error updating category:", error));
    };

    if (loading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <p>Error loading categories: {error}</p>;
    }

    return (
        <div style={{ position: "relative", display: "inline-block" }} ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                style={{
                    backgroundColor: "#e75b1e",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Select Category
            </button>
            {isOpen && (
                <ul
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        listStyle: "none",
                        margin: 0,
                        padding: "0.5rem 0",
                        zIndex: 1000,
                        width: "200px", // Ajusta el ancho según sea necesario
                    }}
                >
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            style={{
                                padding: "0.5rem 1rem",
                                cursor: "pointer",
                                color: "#333",
                                transition: "background-color 0.2s ease",
                            }}
                            onClick={() => handleCategorySelect(category.id)}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = "#f4f4f4")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = "#fff")
                            }
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RestaurantCategorySelector;
