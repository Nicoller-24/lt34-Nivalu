import React, { useState, useEffect } from "react";

export const FilterRestaurantsByLocation = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchRestaurantsNearby(latitude, longitude);
                },
                (error) => setLocationError(error.message)
            );
        } else {
            setLocationError("Geolocalización no soportada por el navegador");
        }
    }, []);

    const fetchRestaurantsNearby = (lat, lon) => {
        fetch(`${process.env.BACKEND_URL}/api/restaurants_nearby?lat=${lat}&lon=${lon}`)
            .then((response) => response.json())
            .then((data) => setRestaurants(data))
            .catch((error) => console.error("Error al obtener restaurantes cercanos:", error));
    };

    return (
        <div className="container">
            <h2>Restaurantes Cercanos</h2>
            {locationError && <p>Error: {locationError}</p>}
            {restaurants.length > 0 ? (
                <ul>
                    {restaurants.map((restaurant) => (
                        <li key={restaurant.id}>
                            {restaurant.name} - Dirección: {restaurant.location}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron restaurantes cercanos</p>
            )}
        </div>
    );
};