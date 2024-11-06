import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import SingleMapComponent from "../component/singlemapcompnent";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
import { useNavigate } from "react-router-dom";



// Inside your component
export const AboutRestaurant = () => {
    const { store, actions } = useContext(Context);
    const [unitrestaurant, setUnitRestaurant] = useState(null);
    const navigate = useNavigate();
    const [reservationInfo, setReservationInfo] = useState({
        number_of_people: '',
        date: null,
        time: null, // change to date object for time picker compatibility
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
        navigate("/reservaExitosa");

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
                <h1 className="display-4">{unitrestaurant.name}</h1>
                    <img
                        src={unitrestaurant.image_url || "fallback_image_url"}
                        className="card-img-top img-fluid rounded shadow-lg"
                        alt={unitrestaurant.name}
                        style={{ width: '400px', height: '400px' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1';
                        }}
                    />
                   
                    <div className="content-wrapper">
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
                <div className="mb-3">
                    <label className="form-label">Number of guests: </label>
                    <input
                        type="number"
                        value={reservationInfo.number_of_people}
                        onChange={(e) => setReservationInfo({ ...reservationInfo, number_of_people: e.target.value })}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Time: </label>
                    <DatePicker
                        selected={reservationInfo.time}
                        onChange={(time) => setReservationInfo({ ...reservationInfo, time })}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Date: </label>
                    <DatePicker
                        selected={reservationInfo.date}
                        onChange={(date) => setReservationInfo({ ...reservationInfo, date })}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Occasion: </label>
                    <select
                        value={reservationInfo.occasion}
                        onChange={(e) => setReservationInfo({ ...reservationInfo, occasion: e.target.value })}
                        className="form-control"
                    >
                        <option value="">Select an occasion</option>
                        {ocasiones.map((ocas) => (
                            <option key={ocas.id} value={ocas.id}>
                                {ocas.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-success w-100">Add reservation</button>   
                         </form>
                    </div>
                </div>
            </div>
        </div>
    );
};