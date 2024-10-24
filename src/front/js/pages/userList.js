import React,{ useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
	//Imporatar contexto
import { Context } from "../store/appContext";



export const UserList = () => {
	const { store, actions } = useContext(Context);

	return(
		<div className="text-center mt-5">
			<h1> Comensales activos </h1>
			
			 
			
			<div className="d-flex justify-content-center col flex-column">
				{store.users.map((usuario, index) => (
					<div key={index} className="m-1 rounded w-75 p-3 border border-info row d-flex align-items-center col mx-auto">
						
						<div className="col">
							<h3>{usuario.name} {usuario.last_name}</h3>
							<p>Email: {usuario.email}</p>
							<p>Teléfono: {usuario.phone_number}</p>
							<p>Cédula: {usuario.identification_number}</p>
							<p>id: {usuario.id}</p>
						</div>

						<div className="col p-auto">
							<Link to={`/updateInfo/?index=${usuario.id}`}>
								<button type="button" className="btn-primary mx-3">Modificar</button>
							</Link>
							<button type="button" className="btn btn-danger" onClick={()=>actions.deleteUser(index)}>Eliminar</button>
						</div>

					
					</div>
				))}

						
			</div>

			<div className="">
				<button type="button" onClick={() => actions.loadUsers()} className="btn btn-primary m-2">Obtener lista</button>
				<Link to="/adduser">
					<button className="btn btn-primary m-2">Agregar comensal</button>
				</Link>
			</div>

		</div>
	);
};