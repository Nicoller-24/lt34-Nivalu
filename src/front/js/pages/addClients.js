import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const AddClients = () => {

    const { store, actions } = useContext(Context);

    const [formInfo, setFormInfo] = useState({
        name: '',
        last_name: '',
		phone:'',
		email: '',
		cedula: '',
		phone_number: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
		actions.addUser(formInfo)
        setFormInfo({
            name: '',
        	last_name: '',
        	email: '',
			cedula:'',
			phone_number:'',
        	password: ''
        });
    };

return (
    <div className="p-3 m-auto w-75">
            <div>
				<h1 className="mx-auto">Agregar un nuevo usuario</h1>
				<Link to="/users" className="">
					<button type="button" class="btn btn-info">Volver</button>
				</Link>
			</div>
			
			<div>
				<form onSubmit={handleSubmit}>
					
					<div className="form-group p-1">
						<label for="exampleInputEmail1">Nombre</label>
						<input
							type="text"
							name="name"
							placeholder="Nombre"
							value={formInfo.name}
							onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
							required
							className="form-control"
						/>
					</div>

					<div className="form-group p-1">
						<label for="exampleInputEmail1">Apellido</label>
						<input
							type="text"
							name="name"
							placeholder="Apellido"
							value={formInfo.last_name}
							onChange={(e) => setFormInfo({ ...formInfo, last_name: e.target.value })}
							required
							className="form-control"
						/>
					</div>
					
					
					<div className="form-group">
						<label for="exampleInputPassword1">Correo Electronico</label>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={formInfo.email}
							onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })}
							required
							className="form-control"
						/>
					</div>

					<div className="form-group p-1">
						<label for="exampleInputEmail1">Cedula</label>
						<input
							type="text"
							name="name"
							placeholder="Cedula"
							value={formInfo.idNumber}
							onChange={(e) => setFormInfo({ ...formInfo, idNumber: e.target.value })}
							required
							className="form-control"
						/>
					</div>

					<div className="form-group p-1">
						<label for="exampleInputEmail1">Phone Number</label>
						<input
							type="text"
							name="name"
							placeholder="Phone Number"
							value={formInfo.phone}
							onChange={(e) => setFormInfo({ ...formInfo, phone: e.target.value })}
							required
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<label for="exampleInputPassword1">Contraseña</label>
						<input
							type="text"
							name="password"
							placeholder="Contraseña"
							value={formInfo.password}
							onChange={(e) => setFormInfo({ ...formInfo, password: e.target.value })}
							required
							className="form-control"
						/>
					</div>
					
					<button type="submit" className="btn btn-success ">Agregar Usuario</button>
				</form>

			</div>
			
        </div>
        
    );
};