import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";

// export const Signuprestaurant = () => {
export const Adminlogin = () => {
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
         {store.admin_auth ? <Navigate to="/admins"/> :(
			<div
				className="container"
				style={{
					backgroundColor: "white",
					width: "30%",
					paddingBottom: "10%",
					marginTop: "12%",
				}}
			>
				<h1 style={{ marginLeft: "25%" }}>Iniciar sesión</h1>
				<form onSubmit={sendData}>
					<div className="mb-3">
						<label htmlFor="Email" className="form-label">
							Email
						</label>
						<input
							type="email"
							className="form-control"
							id="Email"
							placeholder="Email"
							onChange={(e) => setInputEmail(e.target.value)}
							value={inputEmail}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="Password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="Password"
							placeholder="Password"
							onChange={(e) => setInputPassword(e.target.value)}
							value={inputPassword}
						/>
					</div>
                        <button
                            onClick={() =>{actions.adminlogin(inputEmail, inputPassword)}} 
                            // cambiar en flux loginadmin
                            type="submit"
                            style={{
                                backgroundColor: "#008CBA",
                                color: "white",
                                border: "none",
                                borderRadius: "10px",
                                padding: "10px 20px",
                                fontSize: "16px",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#007bb5")
                            }
                            onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#008CBA")
                            }
                        >
                            iniciar sesión
                        </button>
					<Link to="/admineselect">
                    {/* agregar pagina de admin select */}
						<button
							style={{
								backgroundColor: "#008CBA",
								color: "white",
								border: "none",
								borderRadius: "10px",
								padding: "10px 20px",
								fontSize: "16px",
								cursor: "pointer",
								transition: "background-color 0.3s ease",
								marginLeft: "5%",
							}}
							onMouseOver={(e) =>
								(e.target.style.backgroundColor = "#007bb5")
							}
							onMouseOut={(e) =>
								(e.target.style.backgroundColor = "#008CBA")
							}
						>
							Volver
						</button>
					</Link>
				</form>
				<Link to="/">Volver al inicio</Link>
			</div>  
         ) }
		</>
	);
};