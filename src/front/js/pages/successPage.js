import React from "react";
import { Link } from "react-router-dom";

export const SuccessPage = () => {
    return (
        <div className="container text-center">
            <h1>¡Reserva Confirmada!</h1>
            <p>Tu reserva se ha realizado con éxito. ¡Gracias por elegirnos!</p>
            <p>Podras acceder y cancelar tu reserva en tu perfil</p>
            <Link to="/" className="btn btn-primary">Volver a la página principal</Link>
        </div>
    );
};

