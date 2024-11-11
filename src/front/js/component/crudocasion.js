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
{/* 
                            <Link to={"/ocasiones/" + item.id}>
                                    <button style={{ backgroundColor: "white", border: "0px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16" style={{ marginRight: "25px" }}>
                                            <path fillRule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5"/>
                                            <path fillRule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0z"/>
                                        </svg>
                                    </button>
                                </Link> */}
                                <Link to={"/edit/ocasiones/" + item.id}>
                                    <button style={{ backgroundColor: "white", border: "0px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16" style={{ marginRight: "25px" }}>
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                        </svg>
                                    </button>
                                </Link>

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