import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const Edit = () => {
    const [restaurantData, setRestaurantData] = useState(null);
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [inputUserName, setInputUserName] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputGuestCapacity, setInputGuestCapacity] = useState("");

    const { store, actions } = useContext(Context);
    const params = useParams();

    // Función para traer los datos del restaurante
    function traer_restaurante() {
        fetch(`https://cuddly-waffle-5g9r4r6qrjxf7p45-3001.app.github.dev/api/restaurant/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurantData(data);
                setInputName(data.name || "");
                setInputEmail(data.email || "");
                setInputPhone(data.phone_number || "");
                setInputAddress(data.location || "");
                setInputUserName(data.user_name || "");
                setInputGuestCapacity(data.guests_capacity || "");
            });
    }

    useEffect(() => {
        traer_restaurante();
    }, [params.id]);

    // Función para hacer la solicitud PUT
    function putContact(email, guests_capacity, location, name, phone_number, user_name, password) {
        fetch(`https://cuddly-waffle-5g9r4r6qrjxf7p45-3001.app.github.dev/api/restaurant/${params.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email || restaurantData?.email,
                guests_capacity: guests_capacity || restaurantData?.guests_capacity,
                location: location || restaurantData?.location,
                name: name || restaurantData?.name,
                phone_number: phone_number || restaurantData?.phone_number,
                user_name: user_name || restaurantData?.user_name,
                password: password || restaurantData?.password
            }),
            redirect: "follow"
        })
        .then((response) => response.text())
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container" style={{ backgroundColor: "white", width: "70%", paddingBottom: "10%" }}>
            <h1 style={{ marginLeft: "30%" }}>Edit Restaurant</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="Email" placeholder="Email"
                        onChange={(e) => setInputEmail(e.target.value)} value={inputEmail} />
                </div>
                <div className="mb-3">
                    <label htmlFor="guestscapacity" className="form-label">Guests capacity</label>
                    <input type="text" className="form-control" id="guestscapacity" placeholder="Guests capacity"
                        onChange={(e) => setInputGuestCapacity(e.target.value)} value={inputGuestCapacity} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Adress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="Adress" placeholder="Address"
                        onChange={(e) => setInputAddress(e.target.value)} value={inputAddress} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name"
                        onChange={(e) => setInputName(e.target.value)} value={inputName} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="Phone" placeholder="Phone"
                        onChange={(e) => setInputPhone(e.target.value)} value={inputPhone} />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User name</label>
                    <input type="text" className="form-control" id="username" placeholder="User name"
                        onChange={(e) => setInputUserName(e.target.value)} value={inputUserName} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="text" className="form-control" id="password" placeholder="Password"
                        onChange={(e) => setInputPassword(e.target.value)} value={inputPassword} />
                </div>
                <button  onClick={() =>putContact(inputEmail, inputGuestCapacity, inputAddress, inputName, inputPhone, inputUserName, inputPassword)} type="submit" className="btn btn-primary w-100 mb-4">Save</button>
            </form>
        </div>
    );
};
