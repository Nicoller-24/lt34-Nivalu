import React, { useState, useEffect, useRef } from "react";

export const FilterRestaurantsByLocation = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [locationError, setLocationError] = useState(null);
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);

    // Función para cargar el mapa
    const loadMap = (lat, lon) => {
        if (mapRef.current) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat, lng: lon },
                zoom: 14,
            });
            setMap(map);
        }
    };

    // Espera a que la API de Google Maps esté lista
    const waitForGoogleMaps = (callback) => {
        if (window.google && window.google.maps) {
            callback();
        } else {
            setTimeout(() => waitForGoogleMaps(callback), 500);
        }
    };

    useEffect(() => {
        waitForGoogleMaps(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        loadMap(latitude, longitude); // Cargar el mapa
                        fetchRestaurantsNearby(latitude, longitude); // Obtener restaurantes cercanos
                    },
                    (error) => setLocationError(error.message)
                );
            } else {
                setLocationError("Geolocalización no soportada por el navegador");
            }
        });
    }, []);

    // Función para obtener restaurantes cercanos
    const fetchRestaurantsNearby = (lat, lon) => {
        fetch(`${process.env.BACKEND_URL}/api/restaurants_nearby?lat=${lat}&lon=${lon}`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data);
                addMarkers(data); // Añadir los marcadores al mapa
            })
            .catch((error) => console.error("Error al obtener restaurantes cercanos:", error));
    };

    // Función para agregar marcadores en el mapa
    const addMarkers = (restaurants) => {
        restaurants.forEach((restaurant) => {
            const marker = new google.maps.marker.AdvancedMarkerElement({
                map,
                position: {
                    lat: parseFloat(restaurant.latitude),
                    lng: parseFloat(restaurant.longitude),
                },
                title: restaurant.name,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${restaurant.name}</h3><p>${restaurant.location}</p>`,
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
        });
    };

    return (
        <div className="container">
            <h2>Restaurantes Cercanos</h2>
            {locationError && <p>Error: {locationError}</p>}
            {restaurants.length > 0 ? (
                <>
                    <ul>
                        {restaurants.map((restaurant) => (
                            <li key={restaurant.id}>
                                {restaurant.name} - Dirección: {restaurant.location}
                            </li>
                        ))}
                    </ul>
                    <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
                </>
            ) : (
                <p>No se encontraron restaurantes cercanos</p>
            )}
        </div>
    );
};