import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crearocasion = () => {
    const [inputName, setInputname] = useState("");

    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="container">
                <h1 style={{ marginTop: "100px" }}>Crea una nueva ocasion </h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre de la ocasion</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={inputName}
                            onChange={(e) => setInputname(e.target.value)}
                        />
                    </div>
                    
                    <Link to={"/ocasiones"}>
                        <button type="button" className="btn btn-primary" style={{"marginRight": "10px"}} onClick={() => {actions.addNewOcasion( inputName); 
                            setInputname(""); 
                         
                        }}>
                            Crear Nueva Ocasion
                        </button>
                    </Link>
                    <Link to={"/ocasiones"}>
                        O deseas volver
                    </Link>
                </form>
            </div>
        </>
    );
};