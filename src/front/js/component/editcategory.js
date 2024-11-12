import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditCategory = () => { 
	const { actions } = useContext(Context);
	const { id } = useParams();

	const [updateData, setUpdateData] = useState({
		name: '',
		image_url: '',
	});
	const [loading, setLoading] = useState(false);
	const [dataFetched, setDataFetched] = useState(false); // Ensure data is fetched only once

	const preset_name = "nivalu";                         
	const cloud_name = "duh7wjna3";                  

	// Fetch category data only once when the component mounts
	useEffect(() => {
		const fetchCategory = async () => {
			if (id && !dataFetched) {  // Only fetch if data hasn't been fetched
				const category = await actions.traer_categoria(id);
				setUpdateData({
					name: category.name || '',
					image_url: category.image_url || ''
				});
				setDataFetched(true);  // Set flag to true after fetching data
				console.log("Fetched category data:", category); // Debugging
			}
		};
		fetchCategory();
	}, [id, actions, dataFetched]); // Add dataFetched to dependencies

	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', preset_name);
		setLoading(true);

		try {
			const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, { 
				method: 'POST',
				body: data
			});
			const file = await response.json();
			setUpdateData(prevData => ({ ...prevData, image_url: file.secure_url }));
			console.log("Image uploaded:", file.secure_url); // Debugging
		} catch (error) {
			console.error('Error uploading image:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUpdateData(prevData => ({
			...prevData,
			[name]: value // Dynamically update the field based on input's name attribute
		}));
		console.log(`Updated ${name}:`, value); // Debugging
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (id) {
			actions.editCategory(updateData, id); // Save updates
			console.log("Form submitted with data:", updateData); // Debugging
		}
	};

	return (
		<div className="p-3 m-auto w-75">
			<h1 className="mx-auto">Actualización de datos</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group p-1">
					<label htmlFor="name">Nombre</label>
					<input
						type="text"
						name="name"
						placeholder="Nombre"
						value={updateData.name}
						onChange={handleInputChange}
						required
						className="form-control"
					/>
				</div>

				<div className="form-group p-1">
					<label htmlFor="file">Foto</label>
					<input type="file" className="form-control" name="file" id="file" onChange={uploadImage} />
					{loading ? <h3>Loading...</h3> : updateData.image_url && <img src={updateData.image_url} alt="Category" style={{ width: '100px' }} />}
				</div>

				<button type="submit" className="btn btn-success m-3">Modificar Categoria</button>
				<Link to={"/categories"} className="btn btn-secondary">O deseas volver</Link>
			</form>
		</div>
	);
};