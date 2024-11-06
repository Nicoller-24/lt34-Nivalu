import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const ListReservationsUser = () => {
    const { store, actions } = useContext(Context);
    const [reservations, setReservations] = useState([]);

    const getReservationsPerUser = () => {
        const token = actions.loginClient(); 
        const clientId = store.sessionUserId;

        fetch(`${process.env.BACKEND_URL}/api/reservations/${clientId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error fetching reservations: " + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            setReservations(data);
        })
        .catch((error) => {
            console.error("Error fetching reservations:", error);
        });
    };

    useEffect(() => {
        getReservationsPerUser();
    }, []);

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
                                <th>Restaurant</th>
                                <th>Reservation Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{reservation.restaurant_id}</td>
                                <td>{reservation.date}</td>
                                <td>{reservation.time}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => actions.deleteReservation(reservation.id)}
                    >
                        Eliminar
                    </button>
                </div>
            ))
        ) : (
            <p>No reservations yet</p>
        )}
    </div>
)};