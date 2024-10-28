import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Adminhomepage = () => {
    // se agrego admin select
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center d-flex justify-content-center p-5"  
			style={{
				marginTop: "15%", 
				gap: "25px", 
				flexDirection: "column", 
				width: "50%", 
				marginLeft: "25%", 
				backgroundColor: "#f0f0f0", 
				borderRadius: "15px", 
				padding: "20px"
			}}>
			<h1>¿Ya eres parte de Nivalú?</h1>
			<div className="text-center d-flex justify-content-center">
			<Link to="/signup/admins">
				<button style={{
					backgroundColor: "#4CAF50",
					color: "white",
					border: "none",
					borderRadius: "10px",
					padding: "10px 20px",
					fontSize: "16px",
					cursor: "pointer",
					marginRight: "10px",
					transition: "background-color 0.3s ease"
				}}
				onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
				onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
				>
					Crear cuenta
				</button>
			</Link>
			
				<Link to="/adminlogin">
					<button style={{
						backgroundColor: "#008CBA",
						color: "white",
						border: "none",
						borderRadius: "10px",
						padding: "10px 20px",
						fontSize: "16px",
						cursor: "pointer",
						transition: "background-color 0.3s ease"
					}}
					onMouseOver={(e) => e.target.style.backgroundColor = "#007bb5"}
					onMouseOut={(e) => e.target.style.backgroundColor = "#008CBA"}
					>
						Iniciar sesión
					</button>
				</Link>
			</div>
                <Link to="/">Volver al inicio</Link>
		</div>

	);
};