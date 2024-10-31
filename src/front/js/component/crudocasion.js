import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crudocasion = () => {
    const { store, actions } = useContext(Context);
    console.log(store.ocasiones);

    useEffect(()=> {
        console.log(store.ocasiones_auth);
        actions.loadSomeDataOcasion()
    } ,[])

    return (
        <>
            <Link to={"/create/ocasiones"}>
                <button type="button" className="btn btn-primary" >
                    crear nueva ocasion
                </button>
            </Link>

            <ul className="list-group">
                {store.ocasiones.map((item, index) => {
                    return (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            
                            <div className="d-flex">
                                <div style={{ marginLeft: "10px", display: "flex", flexDirection: "column", padding: "5px" }}>
                                    <h3>{item.name}</h3>
                                </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                <button onClick={() => actions.removeOcasion(item.id)} style={{ backgroundColor: "white", border: "0px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-trash-fill">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                    </svg>
                                </button>
                            </div>

                        </li>
                    );
                })}
            </ul>
            <Link to="/">Volver al inicio</Link>
        </>
    );
};