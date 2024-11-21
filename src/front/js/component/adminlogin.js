import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import logo from "../../img/nivalulogo.jpg";

export const Adminlogin = () => {
    const { store, actions } = useContext(Context);
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [authAdminId, setAuthAdminId] = useState(null); // Estado para almacenar el ID del admin autenticado
    const navigate = useNavigate();

    useEffect(() => {
        if (authAdminId) {
            navigate(`/admins/list/${authAdminId}`); // Redirige cuando se obtiene el ID del admin
        }
    }, [authAdminId, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const adminData = await actions.adminlogin(inputEmail, inputPassword);
        if (adminData) {
            setAuthAdminId(adminData.admin_id); // Guarda el ID del admin autenticado
        }
    };
	return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center mb-3">
                                <img src={logo} alt="Logo" style={{ width: "100px", height: "auto", marginBottom: "10px" }} />
                                <p className="text-muted">Inicia sesión como administrador</p>
                            </div>
                            <form onSubmit={handleLogin} className="user">
                                <div className="form-group mb-3">
                                    <input
                                        type="email"
                                        className="form-control form-control-user"
                                        id="Email"
                                        placeholder="Correo electrónico"
                                        onChange={(e) => setInputEmail(e.target.value)}
                                        value={inputEmail}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control form-control-user"
                                        id="Password"
                                        placeholder="Contraseña"
                                        onChange={(e) => setInputPassword(e.target.value)}
                                        value={inputPassword}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-user btn-block w-100"
                                >
                                    Iniciar sesión
                                </button>
                            </form>
                            <hr />
                            <Link to="/adminhomepage">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-user btn-block w-100"
                                >
                                    Volver
                                </button>
                            </Link>

                            <Link to="/signup/admins" className="link-orange">
                                <span className="small">
                                    ¿Aún no tienes una cuenta? ¡Regístrate!
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
