import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const ListReservationsRestaurant = () => {
    const { store, actions } = useContext(Context);  // Usar el contexto dentro del componente
    const [reservations, setReservations] = useState([]);  // Definir el estado de reservas

    const getReservationsPerRestaurant = () => {
        const restaurantId = store.sessionRestaurantId;  // Usar store.sessionRestaurantId para obtener el ID

        fetch(`${process.env.BACKEND_URL}/api/reservationsRestaurant/${restaurantId}`, {
            method: "GET"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching reservations: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setReservations(data);  // Actualizar el estado con las reservas
            })
            .catch((error) => {
                console.error("Error fetching reservations:", error);
            });
    };

    useEffect(() => {
        getReservationsPerRestaurant();  // Llamar a la función para obtener las reservas al cargar el componente
    }, []);  // Se ejecuta solo una vez al cargar el componente

    return (
        <div className="container mt-5">
            <h2>Your Reservations</h2>
            {reservations.length > 0 ? (
                reservations.map((reservation) => (
                    <div key={reservation.id} className="mb-5">
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
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => actions.deleteReservation(reservation.id)}  // Suponiendo que hay una acción para eliminar
                        >
                            Eliminar
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => actions.acceptReservation (reservation.id)}  // Suponiendo que hay una acción para eliminar
                        >
                            Acept reservation
                        </button>

                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => actions.rejectReservation (reservation.id)}  // Suponiendo que hay una acción para eliminar
                        >
                            Reject Reservation
                        </button>
                    </div>
                ))
            ) : (
                <p>No reservations yet</p>
            )}
        </div>
    );
};

