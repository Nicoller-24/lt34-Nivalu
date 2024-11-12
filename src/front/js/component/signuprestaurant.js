import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Signuprestaurant = () => {
    const { store, actions } = useContext(Context);
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [authRestaurantId, setAuthRestaurantId] = useState(null);  // Aquí guardamos el ID directamente como número o string
    const navigate = useNavigate();

    useEffect(() => {
        if (authRestaurantId) {
            navigate(`/restaurants/${authRestaurantId}`); // Navegar solo si `authRestaurantId` es una cadena o número
        }
    }, [authRestaurantId, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const restaurantId = await actions.loginrestaurant(inputEmail, inputPassword);
		console.log("objeto", typeof(restaurantId.restaurant_id) )
        if (restaurantId) {
            setAuthRestaurantId(restaurantId.restaurant_id); 
        }
    };

    return (
        <div className="container" style={{ backgroundColor: "white", width: "30%", paddingBottom: "10%", marginTop: "12%" }}>
            <h1 style={{ marginLeft: "25%" }}>Iniciar sesión</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
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
                    <label htmlFor="Password" className="form-label">Password</label>
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
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#007bb5")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#008CBA")}
                >
                    Iniciar sesión
                </button>
                <Link to="/restauranteselect">
                    <button
                        type="button"
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
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#007bb5")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#008CBA")}
                    >
                        Volver
                    </button>
                </Link>
            </form>
        </div>
    );
};
