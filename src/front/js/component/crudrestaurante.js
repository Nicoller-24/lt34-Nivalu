import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export const Crudrestaurante = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [authRestaurantId, setAuthRestaurantId] = useState(null);

    // Decodifica el token al cargar el componente para obtener el `restaurant_id`
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setAuthRestaurantId(decoded.sub); 
        }
        actions.loadSomeData();
    }, []);

    function salir() {
        actions.logoutrestaurant();
        navigate("/restauranteselect");
        store.restaurant_auth = false;
    }

    return (
        <>
            {store.restaurant_auth ? null : <Navigate to="/restauranteselect" />}
            {store.restaurant_auth ? (
                <button onClick={() => salir()} type="button" className="btn btn-primary">
                    volver
                </button>
            ) : null}
            <Link to={"/signup/restaurants"}>
                <button onClick={() => (store.restaurant_auth = false)} type="button" className="btn btn-primary">
                    crear nuevo restaurante
                </button>
            </Link>

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
                            {authRestaurantId === item.id && (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                    <Link to={`/restaurant/${item.id}`}>
                                        <button style={{ backgroundColor: "white", border: "0px" }}>
                                            Ver Detalles
                                        </button>
                                    </Link>
                                    <Link to={`/edit/restaurant/${item.id}`}>
                                        <button style={{ backgroundColor: "white", border: "0px" }}>
                                            Editar
                                        </button>
                                    </Link>
                                    <button onClick={() => actions.removeRestaurant(item.id)} style={{ backgroundColor: "white", border: "0px" }}>
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
