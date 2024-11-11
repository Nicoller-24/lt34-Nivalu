import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



export const Signuprestaurant = () => {
	const { store, actions } = useContext(Context);
	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");
    const [authRestaurantId, setAuthRestaurantId] = useState(null);




	function sendData(e) {
		e.preventDefault();
		console.log("send data");
		console.log(inputEmail, inputPassword);
	}		

	return (
		<> 
         {store.restaurant_auth ? <Navigate to={`/restaurants/${authRestaurantId}`}/> :(
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
                            onClick={() =>{
								actions.loginrestaurant(inputEmail, inputPassword);
								const token = localStorage.getItem("token");
								if (token) {
									const decoded = jwtDecode(token);
									setAuthRestaurantId(decoded.sub); 
								}
							}}
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
					<Link to="/restauranteselect">
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
			</div>  
         ) }
		</>
	);
};