import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css"; 
import logo from "../../img/nivalulogo.jpg";


export const LoginClient = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const sendData = (e) => {
        e.preventDefault();
        actions.loginClient(email, password).then(success => {
            if (success) {
                navigate("/");
            } else {
                alert("Inicio de sesión fallido");
            }
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center mb-3">
                                <img src={logo} alt="Nivalu Logo" style={{ width: "100px", height: "auto", marginBottom: "10px" }} />
                                <p className="text-muted">Inicia sesión en tu cuenta</p>
                            </div>
                            <form onSubmit={sendData} className="user">
                                <div className="form-group mb-3">
                                    <input
                                        type="email"
                                        className="form-control form-control-user"
                                        id="exampleInputEmail"
                                        aria-describedby="emailHelp"
                                        placeholder="Correo electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control form-control-user"
                                        id="exampleInputPassword"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-user btn-block w-100">
                                    Iniciar Sesión
                                </button>
                            </form>
                            <hr />
                            <Link to="/adduser">
                                            <span className="small">
                                                Aun no tienes una cuenta? Registrate!
                                            </span>
                             </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};