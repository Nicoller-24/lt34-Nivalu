import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import SingleMapComponent from "../component/singlemapcompnent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { NavbarClient } from "../component/navbarclient";
import { useParams } from "react-router-dom";

export const AboutRestaurant = () => {
    const params = useParams();
const { store, actions } = useContext(Context);
const [unitrestaurant, setUnitRestaurant] = useState(null);
const navigate = useNavigate();
const [reservationInfo, setReservationInfo] = useState({
    number_of_people: "",
    date: null,
    time: null,
    occasion: "",
});
const [initialPosition, setInitialPosition] = useState(null);
const [ocasiones, setOcasiones] = useState([]);
const [authClientId, setAuthClientId] = useState(null);
const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

const handleToggleOffcanvas = (state) => {
    setIsOffcanvasOpen(state);
};

useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        const decoded = jwtDecode(token);
        setAuthClientId(decoded.sub);
    }
}, []);

useEffect(() => {
    const restaurantId = getQueryParam("id_restaurant");
    if (restaurantId) {
        const foundRestaurant = store.restaurants.find(
            (restaurant) => restaurant.id === parseInt(restaurantId)
        );
        if (foundRestaurant) {
            setUnitRestaurant(foundRestaurant);
            setInitialPosition({
                lat: parseFloat(foundRestaurant.latitude),
                lng: parseFloat(foundRestaurant.longitude),
            });
        }
    }
}, [store.restaurants]);

const createChat = async (id_restaurant, id_comensal) => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/chat/post/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_restaurant,
                id_comensal,
            }),
        });
        const data = await response.json();
        console.log("Chat creado exitosamente:", data);
        // Navegar al chat recién creado
        navigate(`/client/chat/${authClientId}`);
    } catch (error) {
        console.error("Error al crear el chat:", error);
    }
}; // Aquí cerramos la función correctamente

useEffect(() => {
    const fetchOcasiones = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/ocasiones`);
        const data = await response.json();
        setOcasiones(data);
    };
    fetchOcasiones();
}, []);

const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

const handleSubmit = (e) => {
    e.preventDefault();
    const reservationData = {
        ...reservationInfo,
        client_id: params.id,
        ocasiones_id: reservationInfo.occasion,
        restaurant_id: parseInt(getQueryParam("id_restaurant")),
    };

    actions.addReservation(reservationData);
    navigate(`/reservaExitosa/${params.id}`);

    setReservationInfo({
        number_of_people: "",
        date: "",
        time: "",
        occasion: "",
    });
};

if (!unitrestaurant) return <div>Loading...</div>;

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
        <NavbarClient id={params.id} onToggle={handleToggleOffcanvas} />
    
        <div
    className="page-content"
    style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
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
            paddingTop: "4rem"
        }}
    >
        Restaurant Details
    </h1>

    {/* Main Container */}
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr", // Smaller proportion for restaurant details
            gap: "20px",
        }}
    >
        {/* Restaurant Details Card */}
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                padding: "1rem",
            }}
        >
            {/* Image */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px", // Smaller square size
                    width: "200px", // Same as height
                    overflow: "hidden",
                    margin: "0 auto", // Center the image horizontally
                    borderRadius: "10px",
                }}
            >
                <img
                    src={
                        unitrestaurant.image_url ||
                        "https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1"
                    }
                    alt={unitrestaurant.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>

            {/* Name and Address */}
            <div style={{ textAlign: "center" }}>
                <h3
                    style={{
                        fontFamily: "Nunito, sans-serif",
                        color: "#012970",
                        fontSize: "1.2rem",
                    }}
                >
                    {unitrestaurant.name || "Restaurant Name"}
                </h3>
                <p
                    style={{
                        fontFamily: "Nunito, sans-serif",
                        color: "#555",
                        fontSize: "0.9rem",
                    }}
                >
                    {unitrestaurant.location || "Unknown Location"}
                </p>
            </div>

            {/* Map */}
            <div
                style={{
                    width: "100%",
                    height: "300px", // Smaller map size
                    borderRadius: "10px",
                    overflow: "hidden",
                }}
            >
                {initialPosition && (
                    <SingleMapComponent
                        initialPosition={initialPosition}
                        mapSize={{ width: "100%", height: "100%" }}
                    />
                )}
            </div>
        </div>

       {/* Reservation Card */}
<div
    style={{
        boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "80%"
    }}
>
    <h3
        style={{
            fontFamily: "Nunito, sans-serif",
            color: "#012970",
            textAlign: "center",
            marginBottom: "1rem",
        }}
    >
        Reservation Details
    </h3>
    <form onSubmit={handleSubmit}>
        {/* Input Fields */}
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                rowGap: "1rem",
            }}
        >
            {/* Number of Guests */}
            <div>
                <label
                    style={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        color: "#555",
                        marginBottom: "0.5rem",
                        display: "block",
                    }}
                >
                    Number of Guests
                </label>
                <input
                style={{width:"14rem"}}
                    type="number"
                    value={reservationInfo.number_of_people}
                    onChange={(e) =>
                        setReservationInfo({
                            ...reservationInfo,
                            number_of_people: e.target.value,
                        })
                    }
                    className="form-control"
                    placeholder="Enter number of guests"
                    required
                />
            </div>

            {/* Date */}
            <div>
                <label
                    style={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        color: "#555",
                        marginBottom: "0.5rem",
                        display: "block",
                    }}
                >
                    Date
                </label>
                <DatePicker
                    selected={reservationInfo.date}
                    onChange={(date) =>
                        setReservationInfo({ ...reservationInfo, date })
                    }
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Select a date"
                />
            </div>

            {/* Time */}
            <div>
                <label
                    style={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        color: "#555",
                        marginBottom: "0.5rem",
                        display: "block",
                    }}
                >
                    Time
                </label>
                <DatePicker
                    selected={reservationInfo.time}
                    onChange={(time) =>
                        setReservationInfo({ ...reservationInfo, time })
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="form-control"
                    placeholderText="Select a time"
                />
            </div>

            {/* Occasion */}
            <div>
                <label
                    style={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        color: "#555",
                        marginBottom: "0.5rem",
                        display: "block",
                    }}
                >
                    Occasion
                </label>
                <select
                    style={{width:"14rem"}}
                    value={reservationInfo.occasion}
                    onChange={(e) =>
                        setReservationInfo({
                            ...reservationInfo,
                            occasion: e.target.value,
                        })
                    }
                    className="form-control"
                >
                    <option value="">Select an Occasion</option>
                    {ocasiones.map((ocas) => (
                        <option key={ocas.id} value={ocas.id}>
                            {ocas.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>

       {/* Buttons */}
<div 
    style={{
        marginTop: "78px",
        display: "flex",
        justifyContent: "flex-start", // Mueve los botones a la derecha
        gap: "10px", // Espaciado entre botones
        marginBottom: "68px"
    }}
>
    <button
        type="submit"
        style={{
            backgroundColor: "#e75b1e",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            fontSize: "1rem",
        }}
    >
        Add Reservation
    </button>
    <button
        type="button"
        onClick={() => createChat(unitrestaurant.id, authClientId)}
        style={{
            backgroundColor: "#007bb5",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            fontSize: "1rem",
        }}
    >
        Start a Chat
    </button>
</div>

    </form>
</div>

    </div>
</div>


    </div>
    
    );
};
