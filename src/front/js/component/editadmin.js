import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditAdmin = () => { 
	const { store, actions } = useContext(Context);
	const { id } = useParams(); // Retrieve `id` from URL parameter

	const [updateData, setUpdateData] = useState({
		name: '',
		user_name: '',
		email: '',
		password: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (id) {
			actions.editAdmin(updateData, id); // Call the correctly named action
		}
		setUpdateData({
			name: '',
			user_name: '',
			email: '',
			password: '',
		});
	};

	return (
		<div className="p-3 m-auto w-75">
			<h1 className="mx-auto">Actualización de datos </h1>
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
						<label htmlFor="user_name">Username</label>
						<input
							type="text"
							name="user_name"
							placeholder="Username"
							value={updateData.user_name}
							onChange={(e) => setUpdateData({ ...updateData, user_name: e.target.value })}
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
					
					
					
                    <Link to={"/admins"}>
                        O deseas volver
                    </Link>
						<button type="submit" className="btn btn-success m-3">Modificar Usuario</button>
					
				</form>
			</div>
    );
};