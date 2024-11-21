import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { NavbarRestaurant } from "../component/navbarestaurant";
import { useParams } from "react-router-dom";

export const ListReservationsRestaurant = () => {
    const { store, actions } = useContext(Context);
    const [reservations, setReservations] = useState([]);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const params = useParams();


    const getReservationsPerRestaurant = () => {
        const restaurantId = store.sessionRestaurantId;

        fetch(`${process.env.BACKEND_URL}/api/reservationsRestaurant/${params.id}`, {
            method: "GET",
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
        getReservationsPerRestaurant();
    }, []);

    const handleOffcanvasToggle = (isOpen) => {
        setIsOffcanvasOpen(isOpen);
    };

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
        {store.restaurant_auth ? null : <Navigate to="/loginrestaurant" />}
            
            <NavbarRestaurant id={store.sessionRestaurantId} onToggle={handleOffcanvasToggle} />

            <div
                className="page-content"
                style={{
                    padding: "2rem",
                    marginTop: "4rem",
                    transition: "margin-left 0.3s ease",
                    marginLeft: isOffcanvasOpen ? "300px" : "0",
                }}
            >
                 <h1
                        style={{
                            fontSize: "2rem",
                            fontFamily: "Nunito, sans-serif",        
                            color: "#012970",

                        }}
                    >
                        Reservation Requests
                    </h1>
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 255, 0.2) 0px 1px 6px 4px",
                        padding: "2rem",
                    }}
                >
                    <h2
                        style={{
                            marginBottom: "1.5rem",
                            color: "#012970",
                            fontFamily: "Nunito, sans-serif",
                        }}
                    >
                        Your Reservations
                    </h2>

                    {reservations.length > 0 ? (
                        <table className="table table-striped" style={{ width: "100%", margin: 0 }}>
                            <thead style={{ backgroundColor: "#012970", color: "white" }}>
                                <tr>
                                    <th>#</th>
                                    <th>Client Name</th>
                                    <th>Client Phone</th>
                                    <th>Reservation Date</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation, index) => (
                                    <tr key={reservation.id}>
                                        <td>{index + 1}</td>
                                        <td>{reservation.client_details.name} {reservation.client_details.last_name}</td>
                                        <td>{reservation.client_details.phone_number}</td>
                                        <td>{reservation.date}</td>
                                        <td>{reservation.time}</td>
                                        <td>
                                            <div style={{ display: "flex", gap: "0.5rem" }}>
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ textAlign: "center", color: "#555" }}>No reservations yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};
