import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { NavbarRestaurant } from "../component/navbarestaurant";

export const ListReservationsRestaurant = () => {
    const { store, actions } = useContext(Context); // Usar el contexto dentro del componente
    const [reservations, setReservations] = useState([]); // Definir el estado de reservas
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // Estado para el offcanvas

    const getReservationsPerRestaurant = () => {
        const restaurantId = store.sessionRestaurantId; // Usar store.sessionRestaurantId para obtener el ID

        fetch(`${process.env.BACKEND_URL}/api/reservationsRestaurant/${restaurantId}`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching reservations: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setReservations(data); // Actualizar el estado con las reservas
            })
            .catch((error) => {
                console.error("Error fetching reservations:", error);
            });
    };

    useEffect(() => {
        getReservationsPerRestaurant(); // Llamar a la función para obtener las reservas al cargar el componente
    }, []); // Se ejecuta solo una vez al cargar el componente

    // Manejar el estado del offcanvas
    const handleOffcanvasToggle = (isOpen) => {
        setIsOffcanvasOpen(isOpen);
    };

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
            {/* Navbar con manejo de offcanvas */}
            <NavbarRestaurant id={store.sessionRestaurantId} onToggle={handleOffcanvasToggle} />

            {/* Contenedor principal con desplazamiento */}
            <div
                className="page-content"
                style={{
                    padding: "3rem",
                    marginTop: "4rem",
                    transition: "margin-left 0.3s ease", // Transición suave
                    marginLeft: isOffcanvasOpen ? "300px" : "0", // Desplazar contenido si el offcanvas está abierto
                }}
            >
                {/* Tarjeta contenedora */}
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        padding: "2rem",
                        maxWidth: "900px",
                        margin: "0 auto", // Centrar la tarjeta
                    }}
                >
                    <h2 style={{ marginBottom: "2rem", textAlign: "center", color: "#333" }}>Your Reservations</h2>

                    {reservations.length > 0 ? (
                        reservations.map((reservation) => (
                            <div
                                key={reservation.id}
                                style={{
                                    marginBottom: "1.5rem",
                                    padding: "1rem",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <h4>Reservation Creation Date: {new Date(reservation.created_at).toLocaleDateString()}</h4>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Client ID</th>
                                            <th>Reservation Date</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{reservation.client_id}</td>
                                            <td>{reservation.date}</td>
                                            <td>{reservation.time}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => actions.deleteReservation(reservation.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => actions.acceptReservation(reservation.id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() => actions.rejectReservation(reservation.id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", color: "#555" }}>No reservations yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};
