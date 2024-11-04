import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditCategory = () => { 
	const { store, actions } = useContext(Context);
	const { id } = useParams(); // Retrieve `id` from URL parameter

	const [updateData, setUpdateData] = useState({
		name: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (id) {
			actions.editCategory(updateData, id); // Call the correctly named action
		}
		setUpdateData({
			name: '',

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

					
                    <Link to={"/categories"}>
                        O deseas volver
                    </Link>
						<button type="submit" className="btn btn-success m-3">Modificar Categoria</button>
					
				</form>
			</div>
    );
};