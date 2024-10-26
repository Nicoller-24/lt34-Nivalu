import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crearadmin = () => {
    const [inputName, setInputname] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputUserName, setInputUserName] = useState("");
    const [inputPassword, setInputPassword] = useState("");


    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="container">
                <h1 style={{ marginTop: "100px" }}>Crea un nuevo usuario admin </h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Admin</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={inputName}
                            onChange={(e) => setInputname(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="user_name"
                            value={inputUserName}
                            onChange={(e) => setInputUserName(e.target.value)}
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
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                        />
                    </div>
                    <Link to={"/admins"}>
                        <button type="button" className="btn btn-primary" style={{"marginRight": "10px"}} onClick={() => {actions.addNewAdmin(inputEmail, inputName, inputUserName, inputPassword); 
                            setInputname(""); 
                            setInputEmail("") ;
                            setInputUserName ("");
                            setInputPassword("");
                        }}>
                            Crear Usuario Admin
                        </button>
                    </Link>
                    <Link to={"/admins"}>
                        O deseas volver
                    </Link>
                </form>
            </div>
        </>
    );
};