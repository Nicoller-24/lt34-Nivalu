import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditAdmin = () => { 
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	const preset_name = "nivalu";                         
	const cloud_name = "duh7wjna3";                     

	const [image, setImage] = useState('');      
	const [loading, setLoading] = useState(false);

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
			setImage(file.secure_url);  // Set new image URL
			setLoading(false);
		} catch (error) {
			console.error('Error uploading image:', error);
			setLoading(false);
		}
	};

	const [updateData, setUpdateData] = useState({
		name: '',
		user_name: '',
		email: '',
		password: '',
	});

	// Fetch admin data when component mounts
	useEffect(() => {
		if (id) {
			actions.traer_admin(id).then(admin => {
				setUpdateData({
					name: admin.name || '',
					user_name: admin.user_name || '',
					email: admin.email || '',
					password: admin.password || '',
				});
				setImage(admin.image_url || '');  // Load existing image URL if available
			});
		}
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (id) {
			const updatedAdminData = { ...updateData, image_url: image };  // Include updated image URL
			actions.editAdmin(updatedAdminData, id); // Call the correctly named action
		}
		setUpdateData({
			name: '',
			user_name: '',
			email: '',
			password: '',
		});
		setImage('');
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

				<div className="form-group">
					<label htmlFor="file">Foto</label>
					<input type="file" className="form-control" name="file" id="file" onChange={uploadImage} />
					{loading ? (
						<h3>Loading...</h3>
					) : (
						image && <img src={image} alt="Admin" style={{ width: '100px', marginTop: '10px' }} />
					)}
				</div>

				<Link to={"/admins"}>O deseas volver</Link>
				<button type="submit" className="btn btn-success m-3">Modificar Usuario</button>
			</form>
		</div>
	);
};