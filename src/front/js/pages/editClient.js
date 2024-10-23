import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Context } from "../store/appContext";

export const EditClient = () => { 
	const { store, actions } = useContext(Context);
	const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const index = queryParams.get("index"); 
	

	// Validar si store.users, debe estar en el store de flux y si el index existe
	let id = store.users?.[index]?.id || null;

    const [updateData, setUpdateData] = useState({
        name: '',
        last_name: '',
        email: '',
		identification_number: '',
		phone_number: '',
        password: '',
    });

    const handleSubmit = (i) => {
        i.preventDefault();
		if (id) {
            actions.updateUser(updateData, id); // Llamar a updateUser con los datos, debe estar en flux la accion
        }
        setUpdateData({
            name: '',
        	last_name: '',
        	email: '',
			identification_number: '',
			phone_number: '',
        	password: '',
        });
    };

    return (
        <div className="p-3 m-auto w-75">
            <div>
				<h1 className="mx-auto">Actualización de datos </h1>
			</div>
			
			<div>
				<form onSubmit={handleSubmit}>
					<div className="form-group p-1">
						<label htmlFor="name">Nombre</label>
						<input
							type="text"
							name="name"
							placeholder="Nombre"
							value={updateData.name}
							onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
							required
							className="form-control"
						/>
					</div>

					<div className="form-group p-1">
						<label htmlFor="last_name">Apellido</label>
						<input
							type="text"
							name="last_name"
							placeholder="Apellido"
							value={updateData.last_name}
							onChange={(e) => setUpdateData({ ...updateData, last_name: e.target.value })}
							required
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="email">Correo Electrónico</label>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={updateData.email}
							onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
							required
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="identification_number">Número de Identificación</label>
						<input
							type="text"
							name="identification_number"
							placeholder="Identificación"
							value={updateData.identification_number}
							onChange={(e) => setUpdateData({ ...updateData, identification_number: e.target.value })}
							required
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="phone_number">Número de Teléfono</label>
						<input
							type="text"
							name="phone_number"
							placeholder="Número de Teléfono"
							value={updateData.phone_number}
							onChange={(e) => setUpdateData({ ...updateData, phone_number: e.target.value })}
							required
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							name="password"
							placeholder="Contraseña"
							value={updateData.password}
							onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}
							required
							className="form-control"
						/>
					</div>
					
					
					<Link to="/userList">
						<button type="button" className="btn btn-info">Volver</button>
						<button type="submit" className="btn btn-success m-3">Modificar Usuario</button>
					</Link>
				</form>
			</div>
        </div>
    );
};