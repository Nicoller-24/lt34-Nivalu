import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AddressAutocomplete from "./addressautocomplete";

export const Crudrestaurante = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState(''); // Estado para la dirección completa
    const [firstPartAddress, setFirstPartAddress] = useState(''); // Estado para la primera parte de la dirección

    function salir() {
        actions.logoutrestaurant();
        navigate("/restauranteselect");
        store.restaurant_auth = false;
    }

    useEffect(() => {
        console.log(store.restaurant_auth);
        actions.loadSomeData();
    }, []);

    // Maneja la selección de la dirección
    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        const firstPart = address.split(',')[0]; // Dividir la dirección por comas y tomar la primera parte
        setFirstPartAddress(firstPart); // Guardar la primera parte en el estado
    };

    return (
        <>  
            {store.restaurant_auth ? null : <Navigate to="/restauranteselect" />}
            {store.restaurant_auth ? (
                <button onClick={() => salir()} type="button" className="btn btn-primary">
                    volver
                </button>
            ) : null}
            <Link to={"/signup/restaurants"}>
                <button onClick={() => store.restaurant_auth = false} type="button" className="btn btn-primary">
                    crear nuevo restaurante
                </button>
            </Link>

            {/* Componente AddressAutocomplete */}
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />

            {/* Mostrar la primera parte de la dirección si está disponible */}
            {firstPartAddress && (
                <div>
                    <p>Primera parte de la dirección: {firstPartAddress}</p>
                </div>
            )}

            <ul className="list-group">
                {store.restaurants.map((item, index) => {
                    return (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            <div className="d-flex">
                                <img
                                    src={item.image_url}
                                    style={{ width: "150px", height: "150px", borderRadius: "150px", objectFit: "cover" }}
                                />

                                <div style={{ marginLeft: "10px", display: "flex", flexDirection: "column", padding: "5px" }}>
                                    <h3>{item.name}</h3>

                                    <div style={{ display: "flex" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                        </svg>
                                        <p style={{ marginBottom: "0", marginLeft: "5px" }}>{item.location}</p>
                                    </div>

                                    <div className="d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.885.511a1 1 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                        </svg>
                                        <p style={{ marginBottom: "0", marginLeft: "5px" }}>{item.phone_number}</p>
                                    </div>

                                    <div className="d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                        </svg>
                                        <p style={{ marginBottom: "0", marginLeft: "5px" }}>{item.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                <Link to={"/restaurant/" + item.id}>
                                    <button style={{ backgroundColor: "white", border: "0px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16" style={{ marginRight: "25px" }}>
                                            <path fillRule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5"/>
                                            <path fillRule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0z"/>
                                        </svg>
                                    </button>
                                </Link>
                                <Link to={"/edit/restaurant/" + item.id}>
                                    <button style={{ backgroundColor: "white", border: "0px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M15.968.27a.5.5 0 0 0-.656-.048l-.083.073L12 3.585l-1.414-1.414L9.586.646a.5.5 0 0 0-.707 0l-2 2a.5.5 0 0 0 0 .707L8.586 4 4 8.586V12h3.414L15.968 2.502a.5.5 0 0 0 .048-.707l-2-2zM8.982 7.001 10.586 5.414 11.414 6.243 9.829 7.829 8.982 7.001zM7.5 14H6v-1.5h1.5A.5.5 0 0 1 8 13v1a.5.5 0 0 1-.5.5zM11.293 9.293l1.414 1.414L10 15h-.5a.5.5 0 0 1-.5-.5V14h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                        </svg>
                                    </button>
                                </Link>
                                <button onClick={() => actions.removeRestaurant(item.id)} style={{ backgroundColor: "white", border: "0px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-trash-fill">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
