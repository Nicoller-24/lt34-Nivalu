import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { NavbarClient } from "../component/navbarclient";
import App from "../component/App"; // Componente que devuelve la recomendación


export const ListReservationsUser = () => {
    const { store, actions } = useContext(Context);
    const [reservations, setReservations] = useState([]);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [selectedRecommendation, setSelectedRecommendation] = useState(null); // Estado para manejar la recomendación seleccionada

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
    };

    const getReservationsPerUser = () => {
        const token = actions.loginClient();
        const clientId = store.sessionUserId;

        fetch(`${process.env.BACKEND_URL}/api/reservations/${clientId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
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

    const handleRecommendation = (occasion, date) => {
        // Actualiza el estado con la recomendación seleccionada
        setSelectedRecommendation({ occasion, time: date });
    };

    const closeRecommendation = () => {
        setSelectedRecommendation(null);
    };

    return (
        <>
            <NavbarClient id={store.sessionUserId} onToggle={handleToggleOffcanvas} />
            <div
                className="page-content"
                style={{
                    padding: "2rem",
                    backgroundColor: "#f4f8fb",
                    minHeight: "100vh",
                    marginLeft: isOffcanvasOpen ? "300px" : "0",
                    transition: "margin-left 0.3s ease-in-out",
                    display: "flex",
                    gap: "1rem",
                }}
            >
                <div style={{ flex: 2 }}>
                    <h1
                        style={{
                            fontSize: "2rem",
                            fontFamily: "Nunito, sans-serif",
                            color: "#012970",
                            marginBottom: "1rem",
                            paddingTop: "4rem"

                        }}
                    >
                        Your Reservations
                    </h1>
                    {reservations.length > 0 ? (
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                borderRadius: "10px",
                                backgroundColor: "#ffffff",
                                overflow: "hidden",
                            }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        backgroundColor: "#012970",
                                        color: "white",
                                        textAlign: "left",
                                    }}
                                >
                                    <th style={{ padding: "0.5rem" }}>Restaurant</th>
                                    <th style={{ padding: "0.5rem" }}>Reservation Date</th>
                                    <th style={{ padding: "0.5rem" }}>Time</th>
                                    <th style={{ padding: "0.5rem" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation) => (
                                    <tr key={reservation.id}>
                                        <td style={{ padding: "0.5rem", color: "#555" }}>
                                            {reservation.restaurant_details.name}
                                        </td>
                                        <td style={{ padding: "0.5rem", color: "#555" }}>
                                            {reservation.date}
                                        </td>
                                        <td style={{ padding: "0.5rem", color: "#555" }}>
                                            {reservation.time}
                                        </td>
                                        <td style={{ padding: "0.5rem", display: "flex", gap: "0.5rem" }}>
                                            <button
                                                type="button"
                                                style={{
                                                    backgroundColor: "#e75b1e",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    padding: "0.5rem 1rem",
                                                    cursor: "pointer",
                                                    transition: "background-color 0.3s ease",
                                                }}
                                                onMouseOver={(e) =>
                                                    (e.target.style.backgroundColor = "#cf4b17")
                                                }
                                                onMouseOut={(e) =>
                                                    (e.target.style.backgroundColor = "#e75b1e")
                                                }
                                                onClick={() => actions.deleteReservation(reservation.id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                style={{
                                                    backgroundColor: "#007bb5",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    padding: "0.5rem 1rem",
                                                    cursor: "pointer",
                                                    transition: "background-color 0.3s ease",
                                                }}
                                                onClick={() =>
                                                    handleRecommendation(
                                                        reservation.occasion_details.name,
                                                        reservation.date
                                                    )
                                                }
                                            >
                                                Recommend
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p
                            style={{
                                fontFamily: "Nunito, sans-serif",
                                color: "#555",
                                textAlign: "center",
                                marginTop: "2rem",
                            }}
                        >
                            No reservations yet.
                        </p>
                    )}
                </div>

                {selectedRecommendation && (
                    <div
                        style={{
                            flex: 1,
                            backgroundColor: "#ffffff",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            borderRadius: "10px",
                            padding: "1rem",
                            position: "relative",
                            marginTop: "3rem"
                        }}
                    >
                        <button
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                backgroundColor: "transparent",
                                border: "none",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                                color: "#555",
                            }}
                            onClick={closeRecommendation}
                        >
                            &times;
                        </button>
                        <h2
                            style={{
                                fontFamily: "Nunito, sans-serif",
                                color: "#012970",
                                marginBottom: "1rem",
                            }}
                        >
                            Recommendation
                        </h2>
                        {/* Renderizamos App automáticamente */}
                        <App
                            ocassion={selectedRecommendation.occasion}
                            time={selectedRecommendation.time}
                        />
                    </div>
                )}
            </div>
        </>
    );
};
