import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import SingleMapComponent from "./singlemapcompnent";
import { Navigate } from "react-router-dom";
import { NavbarRestaurant } from "./navbarestaurant";
import "../../styles/singlerestaurant.css"; // Archivo CSS para personalizar estilos

export const Singlerestaurant = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    
    const [initialPosition, setInitialPosition] = useState(null);
    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        const traer_restaurante = () => {
            fetch(`${process.env.BACKEND_URL}/api/restaurant/${params.id}`)
                .then((response) => response.json())
                .then((data) => {
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

        traer_restaurante();
    }, [params.id]);

    return (
        <>
            {store.restaurant_auth ? null : <Navigate to="/restauranteselect" />}
            <NavbarRestaurant id={params.id} />
            <div className="restaurant-container">
                {restaurant.image_url && (
                    <img
                        src={restaurant.image_url}
                        className="restaurant-image"
                        alt={restaurant.name}
                    />
                )}
                <div className="restaurant-info">
                    <h1 className="restaurant-name">{restaurant.name}</h1>
                    <h3 className="restaurant-phone">{restaurant.phone_number}</h3>
                    <h3 className="restaurant-location">{restaurant.location}</h3>

                    {initialPosition && (
                        <SingleMapComponent
                            initialPosition={initialPosition}
                        />
                    )}
                    
                    <div className="buttons-container">
                        <Link to={`/restaurant/chat/${params.id}`}>
                            <button type="button" className="btn btn-primary chat-button">View Chats</button>
                        </Link>
                        <Link to={`/restaurants/${params.id}`} className="back-link">
                            or Go Back
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
