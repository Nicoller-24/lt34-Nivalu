import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { NavbarClient } from "./navbarclient";

export const FilterRestaurantsByLocation = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [locationError, setLocationError] = useState(null);
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const params = useParams();

    // Función para alternar el estado del offcanvas
    const handleToggleOffcanvas = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const loadMap = (lat, lon) => {
        if (mapRef.current) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat, lng: lon },
                zoom: 14,
            });
            setMap(map);
        }
    };

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
                        loadMap(latitude, longitude);
                        fetchRestaurantsNearby(latitude, longitude);
                    },
                    (error) => setLocationError(error.message)
                );
            } else {
                setLocationError("Geolocation not supported by this browser.");
            }
        });
    }, []);

    const fetchRestaurantsNearby = (lat, lon) => {
        fetch(`${process.env.BACKEND_URL}/api/restaurants_nearby?lat=${lat}&lon=${lon}`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data);
                addMarkers(data);
            })
            .catch((error) => console.error("Error fetching nearby restaurants:", error));
    };

    const addMarkers = (restaurants) => {
        restaurants.forEach((restaurant) => {
            const marker = new window.google.maps.Marker({
                map,
                position: {
                    lat: parseFloat(restaurant.latitude),
                    lng: parseFloat(restaurant.longitude),
                },
                title: restaurant.name,
            });

            const infoWindow = new window.google.maps.InfoWindow({
                content: `<h3>${restaurant.name}</h3><p>${restaurant.location}</p>`,
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
        });
    };

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
            <NavbarClient id={params.id} onToggle={handleToggleOffcanvas} />

            <div
                className="page-content"
                style={{
                    paddingTop: "80px",
                    padding: "2rem",
                    marginLeft: isOffcanvasOpen ? "300px" : "0",
                    transition: "margin-left 0.3s ease-in-out",
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",
                        fontFamily: "Nunito, sans-serif",
                        color: "#012970",
                        marginBottom: "1rem",
                        paddingTop: "3rem"
                    }}
                >
                    Nearby Restaurants
                </h1>

                {locationError && <p style={{ color: "red" }}>{locationError}</p>}

                {restaurants.length > 0 ? (
                    <div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "1.5rem",
                                marginBottom: "2rem",
                            }}
                        >
                            {restaurants.map((restaurant) => (
                                <div
                                    key={restaurant.id}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        backgroundColor: "#ffffff",
                                        borderRadius: "9px",
                                        padding: "1.5rem",
                                        boxShadow: "rgb(0 0 255 / 9%) 0px 1px 6px 4px",
                                        transition: "transform 0.3s ease-in-out",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                                    onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                                >
                                    <h3
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: "bold",
                                            color: "#012970",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        {restaurant.name}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "0.9rem",
                                            color: "#555",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        {restaurant.location}
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: "Open Sans, sans-serif",
                                                fontSize: "0.9rem",
                                                color: "#555",
                                            }}
                                        >
                                            Email: {restaurant.email}
                                        </span>
                                        <img
                                            src={restaurant.image_url}
                                            alt={restaurant.name}
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div ref={mapRef} style={{ width: "100%", height: "500px", borderRadius: "10px" }} />
                    </div>
                ) : (
                    <p style={{ textAlign: "center", fontFamily: "Nunito, sans-serif", color: "#555" }}>
                        No nearby restaurants found.
                    </p>
                )}
            </div>
        </div>
    );
};
