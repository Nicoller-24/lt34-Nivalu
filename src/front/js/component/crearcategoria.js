import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crearcategoria = () => {
    const [inputName, setInputname] = useState("");
    const { store, actions } = useContext(Context);
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        actions.addNewCategory(inputName);
        setInputname(""); // Clear the input after submission
    };

    return (
        <>
            <div className="container">
                <h1 style={{ marginTop: "100px" }}>Crea una nueva categoria </h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre de la categoria</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={inputName}
                            onChange={(e) => setInputname(e.target.value)}
                        />
                    </div>
                    
                    <Link to={"/categories"}>
                        <button type="button" className="btn btn-primary" style={{"marginRight": "10px"}} onClick={() => {actions.addNewCategory( inputName); 
                            setInputname(""); 
                         
                        }}>
                            Crear Nueva Categoria
                        </button>
                    </Link>
                    <Link to={"/categories"}>
                        O deseas volver
                    </Link>
                </form>
            </div>
        </>
    );
};