import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { Mapautocompletate } from "./mapautocompletate";
import AddressAutocomplete from "./addressautocomplete";
import MapComponent from "./mapcomponet";

export const Edit = () => {
    const [restaurantData, setRestaurantData] = useState(null);
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [inputGuestCapacity, setInputGuestCapacity] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(''); 
    const [selectedLocation, setSelectedLocation] = useState(null);
    

    const { store, actions } = useContext(Context);
    const params = useParams();


    function traer_restaurante() {
        fetch(process.env.BACKEND_URL + `/api/restaurant/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurantData(data);
                setInputName(data.name || "");
                setInputEmail(data.email || "");
                setInputPhone(data.phone_number || "");
                setSelectedAddress(data.location || "");
                setInputGuestCapacity(data.guests_capacity || "");
            })
            .catch((error) => console.error("Error al cargar el restaurante:", error));
    }

    function putRestaurant(email, guests_capacity, location, name, phone_number) {
        fetch(process.env.BACKEND_URL + `/api/restaurant/${params.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email || restaurantData?.email,
                guests_capacity: guests_capacity || restaurantData?.guests_capacity,
                location: location || restaurantData?.location,
                name: name || restaurantData?.name,
                phone_number: phone_number || restaurantData?.phone_number
            }),
        })
        .then((response) => {
            console.log(response.status);
            actions.loadSomeData()
            return response.text();
        })
        .then((result) => {
            console.log("Resultado:", result);
        })
        .catch((error) => console.error("Error al guardar el restaurante:", error));
    }

    useEffect(() => {
        traer_restaurante();
    }, [params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleAddressSelect = (address, location) => {
        setSelectedAddress(address);
        setSelectedLocation(location);
        console.log("Dirección seleccionada:", address);
        console.log("Coordenadas seleccionadas:", location);
    };


    return (
        <div className="container" style={{ backgroundColor: "white", width: "70%", paddingBottom: "10%" }}>
            <h1 style={{ marginLeft: "30%" }}>Edit Restaurant</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="Email"
                        placeholder="Email"
                        onChange={(e) => setInputEmail(e.target.value)}
                        value={inputEmail}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="guestscapacity" className="form-label">Guests capacity</label>
                    <input
                        type="text"
                        className="form-control"
                        id="guestscapacity"
                        placeholder="Guests capacity"
                        onChange={(e) => setInputGuestCapacity(e.target.value)}
                        value={inputGuestCapacity}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Adress" className="form-label">Address</label>
                    <AddressAutocomplete
                    onAddressSelect={handleAddressSelect}
                    initialAddress={selectedAddress} // Nueva prop para la dirección inicial
                    />

                    {selectedLocation && (
                        <MapComponent initialPosition={selectedLocation} />
                    )}
                    {selectedLocation && (
                        <div>
                            <p>Latitud: {selectedLocation.lat}</p>
                            <p>Longitud: {selectedLocation.lng}</p>
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        onChange={(e) => setInputName(e.target.value)}
                        value={inputName}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Phone"
                        placeholder="Phone"
                        onChange={(e) => setInputPhone(e.target.value)}
                        value={inputPhone}
                    />
                </div>
                <Link to="/restaurants">
                    <button
                        onClick={() => {putRestaurant(inputEmail, inputGuestCapacity, selectedAddress, inputName, inputPhone)}}
                        type="submit"
                        className="btn btn-primary w-100 mb-4"
                    >
                        Save
                    </button>
                </Link>
                <Link to="/restaurants">
                    <button type="button" className="btn btn-secondary w-100">
                        O deseas volver
                    </button>
                </Link>
            </form>
        </div>
    );
};