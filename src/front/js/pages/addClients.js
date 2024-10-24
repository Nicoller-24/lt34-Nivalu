import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const AddClients = () => { 
    const { store, actions } = useContext(Context);

    const [formInfo, setFormInfo] = useState({
        name: '',
        last_name: '',
        email: '',
        identification_number: '',
        phone_number: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.addUser(formInfo);
        setFormInfo({
            name: '',
            last_name: '',
            email: '',
            identification_number: '',
            phone_number: '',
            password: ''
        });
    };

    return (
        <div className="p-3 m-auto w-75">
            <div>
                <h1 className="mx-auto">Creacion de comensal</h1>
                
            </div>
            
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group p-1">
                        <label htmlFor="name">Nombre</label>
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
                        <label htmlFor="last_name">Apellido</label>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Apellido"
                            value={formInfo.last_name}
                            onChange={(e) => setFormInfo({ ...formInfo, last_name: e.target.value })}
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
                            value={formInfo.email}
                            onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group p-1">
                        <label htmlFor="identification_number">Cedula</label>
                        <input
                            type="text"
                            name="identification_number"
                            placeholder="Cedula"
                            value={formInfo.identification_number}
                            onChange={(e) => setFormInfo({ ...formInfo, identification_number: e.target.value })}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group p-1">
                        <label htmlFor="phone_number">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            placeholder="Phone Number"
                            value={formInfo.phone_number}
                            onChange={(e) => setFormInfo({ ...formInfo, phone_number: e.target.value })}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
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

                    <button type="submit" className="btn btn-success">Agregar Usuario</button>

                </form>

				<div>
                    
                    
					<Link to="/users">
                    <button type="button" className="btn btn-info">Volver</button>
               		</Link>

				</div>

            </div>
        </div>
    );
};