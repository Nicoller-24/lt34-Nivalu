import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import logo from "../../img/nivalulogo.jpg";


export const Signuprestaurant = () => {
	const { store, actions } = useContext(Context);
	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	function sendData(e) {
		e.preventDefault();
		console.log("send data");
		console.log(inputEmail, inputPassword);
	}		

	return (
		<> 
          {store.restaurant_auth ? (
                <Navigate to="/restaurants" />
            ) : (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="text-center mb-3">
                                        <img
                                            src={logo}
                                            alt="Nivalu Logo"
                                            className="mb-3"
                                            style={{ width: "150px" }}
                                        />
										<p className="text-muted">Inicia sesión en tu cuenta</p>
                                        
                                    </div>
                                    <form onSubmit={sendData}>
                                        <div className="form-group mb-3">
                                            <input
                                                type="email"
                                                className="form-control form-control-user"
                                                id="Email"
                                                placeholder="Correo electrónico"
                                                onChange={(e) =>
                                                    setInputEmail(
                                                        e.target.value
                                                    )
                                                }
                                                value={inputEmail}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                id="Password"
                                                placeholder="Contraseña"
                                                onChange={(e) =>
                                                    setInputPassword(
                                                        e.target.value
                                                    )
                                                }
                                                value={inputPassword}
                                            />
                                        </div>
                                        <button
                                            onClick={() =>
                                                actions.loginrestaurant(
                                                    inputEmail,
                                                    inputPassword
                                                )
                                            }
                                            type="submit"
                                            className="btn btn-primary btn-user btn-block w-100"
                                        >
                                            Iniciar Sesión
                                        </button>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <Link to="/signup/restaurants">
                                            <span className="small">
                                                Aun no tienes una cuenta? Registrate!
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
		</>
	);
};