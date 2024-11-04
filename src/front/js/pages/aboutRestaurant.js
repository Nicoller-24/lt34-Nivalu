import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import SingleMapComponent from "../component/singlemapcompnent";


export const AboutRestaurant = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const [unitrestaurant, setUnitRestaurant] = useState(null);
    const [reservationInfo, setReservationInfo] = useState({
        number_of_people: '',
        date: '',
        time: '',
        occasion: ''
    });
    const [initialPosition, setInitialPosition] = useState(null);


    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
      }
      
   

    const handleSubmit = (e) => {
        e.preventDefault();
         // Agregar client_id y restaurant_id a reservationInfo
    const reservationData = {
        ...reservationInfo,
        client_id: store.sessionUserId, // Usar el ID almacenado
        restaurant_id: getQueryParam('id_restaurant')// Suponiendo que uid es el ID del restaurante
    };

    console.log(reservationData); // Agrega esta línea para verificar la información
    console.log(store);




        actions.addReservation(reservationData);
        setReservationInfo({
            number_of_people: '',
            date: '',
            time: '',
            occasion: '',
            client_id:'',
            restaurant_id:''
        });
    };


    useEffect(() => {
        const foundRestaurant = store.restaurants.find(restaurant => restaurant.uid === uid);
        setUnitRestaurant(foundRestaurant);
        console.log("found",foundRestaurant)
        console.log(unitrestaurant)
       setInitialPosition({
            lat: parseFloat(foundRestaurant.latitude),
            lng: parseFloat(foundRestaurant.longitude),
        })
    }, [uid, store.restaurants]);

    if (!unitrestaurant) return <div>Loading...</div>;

    const handleAddressSelect = (location) => {
        setSelectedLocation(location);
        console.log("Coordenadas seleccionadas:", location);
    };

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
                        {initialPosition && (
                            <SingleMapComponent
                                initialPosition={initialPosition}
                                onLocationSelect={handleAddressSelect}
                            />
                        )}
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

                    <div className="p-3 m-auto w-75">
                        <div>
                            <h1 className="mx-auto">Book your table</h1>

                        </div>

                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group p-1">
                                    <label htmlFor="Numero de personas">Number of guest</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="How many people will come?"
                                        value={reservationInfo.number_of_people}
                                        onChange={(e) => setReservationInfo({ ...reservationInfo, number_of_people: e.target.value })}
                                        required
                                        className="form-control"
                                    />
                                </div>

                                <div className="form-group p-1">
                                    <label htmlFor="Time">Time</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        placeholder="What time are you coming?"
                                        value={reservationInfo.time}
                                        onChange={(e) => setReservationInfo({ ...reservationInfo, time: e.target.value })}
                                        required
                                        className="form-control"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Date">Date</label>
                                    <input
                                        type="text"
                                        name="date"
                                        placeholder="Date of your reservation"
                                        value={reservationInfo.date}
                                        onChange={(e) => setReservationInfo({ ...reservationInfo, date: e.target.value })}
                                        required
                                        className="form-control"
                                    />
                                </div>

                                <div className="form-group p-1">
                                    <label htmlFor="occasion">Occasion</label>
                                    <input
                                        type="text"
                                        name="Occasion"
                                        placeholder="Are you coming for an special occasion?"
                                        value={reservationInfo.occasion}
                                        onChange={(e) => setReservationInfo({ ...reservationInfo, occasion: e.target.value })}
                                        required
                                        className="form-control"
                                    />
                                </div>


                                <button type="submit" className="btn btn-success">Add reservation</button>

                            </form>








                        </div>


                    </div>
                </div>


            </div>
        </div>


    );
};