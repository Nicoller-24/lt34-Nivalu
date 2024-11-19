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

    const mapSize = isOffcanvasOpen
        ? { width: "100%", height: "300px" } // Tamaño reducido cuando el canvas está abierto
        : { width: "100%", height: "400px" }; // Tamaño normal cuando el canvas está cerrado

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
                }}
            >
                Restaurant Details
            </h1>
    
            {/* Contenedor principal */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 3fr", // Más espacio para la imagen y mapa
                    gap: "20px",
                    alignItems: "start",
                }}
            >
                {/* Tarjeta: Imagen y Mapa */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        padding: "1rem",
                        boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                    }}
                >
                    {/* Imagen */}
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
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
                                borderRadius: "10px",
                            }}
                        />
                    </div>
    
                    {/* Información de Restaurante */}
                    <div
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <h3
                            style={{
                                fontFamily: "Nunito, sans-serif",
                                color: "#012970",
                            }}
                        >
                            {unitrestaurant.name}
                        </h3>
                        <p
                            style={{
                                fontFamily: "Nunito, sans-serif",
                                color: "#555",
                            }}
                        >
                            {unitrestaurant.location || "Unknown Location"}
                        </p>
                    </div>
    
                    {/* Mapa */}
                    <div
                        style={{
                            width: "100%",
                            height: "300px", // Ajusta según el espacio disponible
                            borderRadius: "10px",
                            overflow: "hidden",
                        }}
                    >
                        {initialPosition && (
                            <SingleMapComponent
                                initialPosition={initialPosition}
                                mapSize={mapSize}
                            />
                        )}
                    </div>
                </div>
    
                {/* Formulario de Reservas */}
                <div
                    style={{
                        padding: "1rem",
                        boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#012970" }}>
                        Reservation Details
                    </h3>
                    <form onSubmit={handleSubmit}>
                        {/* Inputs en dos columnas */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "20px",
                            }}
                        >
                            {/* Número de invitados */}
                            <div style={{ width: "100%" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>
                                    Number of Guests
                                </label>
                                <input
                                    type="number"
                                    value={reservationInfo.number_of_people}
                                    onChange={(e) =>
                                        setReservationInfo({
                                            ...reservationInfo,
                                            number_of_people: e.target.value,
                                        })
                                    }
                                    className="form-control"
                                    required
                                />
                            </div>
    
                            {/* Fecha */}
                            <div style={{ width: "100%" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>
                                    Date
                                </label>
                                <DatePicker
                                    selected={reservationInfo.date}
                                    onChange={(date) =>
                                        setReservationInfo({ ...reservationInfo, date })
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                />
                            </div>
    
                            {/* Tiempo */}
                            <div style={{ width: "100%" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>
                                    Time
                                </label>
                                <DatePicker
                                    selected={reservationInfo.time}
                                    onChange={(time) =>
                                        setReservationInfo({ ...reservationInfo, time })
                                    }
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={60}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="form-control"
                                />
                            </div>
    
                            {/* Ocasión */}
                            <div style={{ width: "100%" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>
                                    Occasion
                                </label>
                                <select
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
    
                        {/* Botones */}
                        <div style={{ marginTop: "20px" }}>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#e75b1e",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                    width: "100%",
                                    marginBottom: "10px",
                                }}
                            >
                                Add Reservation
                            </button>
                            <button
                                onClick={() => createChat(unitrestaurant.id, authClientId)}
                                style={{
                                    backgroundColor: "#007bb5",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                    width: "100%",
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
