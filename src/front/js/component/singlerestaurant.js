import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import SingleMapComponent from "./singlemapcompnent";

export const Singlerestaurant = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    
    const [initialPosition, setInitialPosition] = useState(null);
    const [restaurant, setRestaurant] = useState({});
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const traer_restaurante = () => {
        fetch(`${process.env.BACKEND_URL}/api/restaurant/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Datos del restaurante:", data);
                setRestaurant(data);
                if (data.latitude && data.longitude) {
                    setInitialPosition({
                        lat: parseFloat(data.latitude),
                        lng: parseFloat(data.longitude),
                    });
                }
            })
            .catch((error) => console.error("Error al cargar el restaurante:", error));
    };

    useEffect(() => {
        traer_restaurante();
    }, [params.id]);

    const handleAddressSelect = (location) => {
        setSelectedLocation(location);
        console.log("Coordenadas seleccionadas:", location);
    };

    return (
        <>
            {restaurant.image_url && (
                <img
                    src={restaurant.image_url}
                    style={{ width: "400px", height: "400px", objectFit: "cover" }}
                    alt={restaurant.name}
                />
            )}
            <h1>{restaurant.name}</h1>
            <h3>{restaurant.phone_number}</h3>
            <h3>{restaurant.location}</h3>

            {initialPosition && (
                <SingleMapComponent
                    initialPosition={initialPosition}
                    onLocationSelect={handleAddressSelect}
                />
            )}

            <Link to="/restaurants">
                O deseas volver
            </Link>
        </>
    );
};
