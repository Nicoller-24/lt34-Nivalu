import React, { useState, useEffect } from "react";

const ClientDetails = ({ clientId }) => {
    // Estado para almacenar los datos del cliente
    const [clientData, setClientData] = useState(null); // null como valor inicial
    const [loading, setLoading] = useState(true); // Estado para mostrar el loading
    const [error, setError] = useState(null); 

    useEffect(() => {
        // Llamada a la API para obtener los datos del cliente
        fetch(`https://your-backend-url/client/${clientId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Si es necesario agregar un token, descomenta la siguiente línea:
                // "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setClientData(data); // Asigna los datos al estado
            setLoading(false); // Finaliza el loading
        })
        .catch((error) => {
            setError(error.message); // Maneja errores
            setLoading(false); // Finaliza el loading
        });
    }, [clientId]); // El useEffect se ejecutará cuando el clientId cambie

    if (loading) {
        return <div>Loading...</div>; // Muestra "Loading..." mientras esperamos los datos
    }

    if (error) {
        return <div>Error: {error}</div>; // Muestra el error si ocurre
    }

    return (
        <div>
            <h1>Detalles del Cliente</h1>
            {clientData ? (
                <div>
                    <p><strong>Nombre:</strong> {clientData.name} {clientData.last_name}</p>
                    <p><strong>Email:</strong> {clientData.email}</p>
                    <p><strong>Identificación:</strong> {clientData.identification_number}</p>
                    <p><strong>Teléfono:</strong> {clientData.phone_number}</p>
                    <p><strong>Estado:</strong> {clientData.is_active ? "Activo" : "Inactivo"}</p>
                </div>
            ) : (
                <p>No se encontraron datos para este cliente.</p>
            )}
        </div>
    );
};

export default ClientDetails;
