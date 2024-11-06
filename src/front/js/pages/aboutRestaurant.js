import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import SingleMapComponent from "../component/singlemapcompnent";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const AboutRestaurant = () => {
    const { store, actions } = useContext(Context);
    const [unitrestaurant, setUnitRestaurant] = useState(null);
    const [reservationInfo, setReservationInfo] = useState({
        number_of_people: '',
        date: null,
        time: '',
        occasion: ''
    });
    const [initialPosition, setInitialPosition] = useState(null);
    const [ocasiones, setOcasiones] = useState([]);

    useEffect(() => {
        const restaurantId = getQueryParam('id_restaurant');
        if (restaurantId) {
            const foundRestaurant = store.restaurants.find(restaurant => restaurant.id === parseInt(restaurantId));
            if (foundRestaurant) {
                setUnitRestaurant(foundRestaurant);
                setInitialPosition({
                    lat: parseFloat(foundRestaurant.latitude),
                    lng: parseFloat(foundRestaurant.longitude),
                });
            }
        }
    }, [store.restaurants]);

    useEffect(() => {
        const fetchOcasiones = async () => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/ocasiones`);
            const data = await response.json();
            setOcasiones(data);
        };
        fetchOcasiones();
    }, []);

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const reservationData = {
            ...reservationInfo,
            client_id: store.sessionUserId,
            ocasiones_id: reservationInfo.occasion,
            restaurant_id: parseInt(getQueryParam('id_restaurant')),
        };

        actions.addReservation(reservationData);
        setReservationInfo({
            number_of_people: '',
            date: '',
            time: '',
            occasion: '',
        });
    };

    if (!unitrestaurant) return <div>Loading...</div>;

    return (
        <div className="container text-align">
            <div className="row">
                <div className="col-8">
                    <img
                        src={unitrestaurant.image_url || "fallback_image_url"}
                        className="card-img-top"
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
                        <p className="lead">Location: {unitrestaurant.location || "Unknown"}</p>
                        {initialPosition && (
                            <SingleMapComponent
                                initialPosition={initialPosition}
                            />
                        )}
                        <p className="lead">Phone Number: {unitrestaurant.phone_number || "Unknown"}</p>
                        <p className="lead">Email: {unitrestaurant.email || "Unknown"}</p>
                        <p className="lead">Guest Capacity: {unitrestaurant.guests_capacity || "Unknown"}</p>
                        <h2>Details of the restaurant? Menu?</h2>
                    </div>
                </div>
                <div className="col-4">
                    <div className="p-3 m-auto w-75">
                        <div><h1 className="mx-auto">Book your table</h1></div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group p-1">
                                <label>Number of guests</label>
                                <input
                                    type="text"
                                    placeholder="How many people?"
                                    value={reservationInfo.number_of_people}
                                    onChange={(e) => setReservationInfo({ ...reservationInfo, number_of_people: e.target.value })}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group p-1">
                                <label>Time</label>
                                <input
                                    type="text"
                                    placeholder="What time?"
                                    value={reservationInfo.time}
                                    onChange={(e) => setReservationInfo({ ...reservationInfo, time: e.target.value })}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <DatePicker
                                    selected={reservationInfo.date}
                                    onChange={(date) => setReservationInfo({ ...reservationInfo, date })}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Select a date"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group p-1">
                                <label>Occasion</label>
                                <select
                                    value={reservationInfo.occasion}
                                    onChange={(e) => setReservationInfo({ ...reservationInfo, occasion: e.target.value })}
                                    required
                                    className="form-control"
                                >
                                    <option value="">Select an occasion</option>
                                    {ocasiones.map(ocas => (
                                        <option key={ocas.id} value={ocas.id}>{ocas.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success">Add reservation</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};