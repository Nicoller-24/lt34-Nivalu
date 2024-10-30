import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const AboutRestaurant = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const [unitrestaurant, setUnitRestaurant] = useState(null);

    useEffect(() => {
        const foundRestaurant = store.restaurants.find(restaurant => restaurant.uid === uid);
        setUnitRestaurant(foundRestaurant);
    }, [uid, store.restaurants]);

    if (!unitrestaurant) return <div>Loading...</div>;

    return (
        <div className="container text-align">
            <div className="row">
                <div className="col-8">
                    <img
                        src={unitrestaurant.image_url || "fallback_image_url"}
                        className="card-img-top"
                        id="restaurant"
                        alt={unitrestaurant.name}
                        style={{ width: '400px', height: '400px' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://previews.123rf.com/images/dmitrymoi/dmitrymoi1702/dmitrymoi170200016/71707598-restaurante-o-cafeter%C3%ADa-edificio-exterior-vector-ilustraci%C3%B3n-de-dibujos-animados.jpg';
                        }}
                    />

                    <h1> Information about us! </h1>

                    <div className="content-wrapper">
                        <h2 className="display-4">{unitrestaurant.name}</h2>
                        <p className="lead">
                            Location: {unitrestaurant.location || "Unknown"}
                        </p>
                        <p className="lead">
                            Phone Number: {unitrestaurant.phone_number || "Unknown"}
                        </p>
                        <p className="lead">
                            Email: {unitrestaurant.email || "Unknown"}
                        </p>
                        <p className="lead">
                            Guest Capacity: {unitrestaurant.guests_capacity || "Unknown"}
                        </p>
                        <h2>Details of the restaurant? Menu? </h2>
                    </div>
                </div>

                <div className="col-4">




                </div>


            </div>
        </div>
    );
};