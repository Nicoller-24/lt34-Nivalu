import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crearrestaurante = () => {
    const [inputName, setInputname] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputGuestCapacity, setInputGuestCapacity] = useState("");

    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="container">
                <h1 style={{ marginTop: "100px" }}>Crea un nuevo restaurante</h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Restaurante</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={inputName}
                            onChange={(e) => setInputname(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Número de teléfono</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            value={inputPhone}
                            onChange={(e) => setInputPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={inputAddress}
                            onChange={(e) => setInputAddress(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="guests_capacity">Capacidad de invitados</label>
                        <input
                            type="number"
                            className="form-control"
                            id="guests_capacity"
                            value={inputGuestCapacity}
                            onChange={(e) => setInputGuestCapacity(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                        />
                    </div>
                    <Link to={"/restaurants"}>
                        <button type="button" className="btn btn-primary" style={{"marginRight": "10px"}} onClick={() => {actions.addNewRestaurant(inputEmail, inputGuestCapacity, inputAddress, inputName, inputPhone, inputPassword); 
                            setInputGuestCapacity("");
                            setInputname(""); 
                            setInputPhone("");
                            setInputEmail("") ; 
                            setInputAddress("");
                            setInputPassword("");
                        }}>
                            Crear Restaurante
                        </button>
                    </Link>
                    <Link to={"/restaurants"}>
                        O deseas volver
                    </Link>
                </form>
            </div>
        </>
    );
};
