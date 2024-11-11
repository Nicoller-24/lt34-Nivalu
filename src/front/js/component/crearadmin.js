import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crearadmin = () => {
    const { actions } = useContext(Context);
    
    const [inputName, setInputname] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputUserName, setInputUserName] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const preset_name = "nivalu";                         
    const cloud_name = "duh7wjna3";                 


    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name); // Replace 'your_preset' with your actual preset name

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, { // Replace 'your_cloud_name' with your actual Cloudinary cloud name
                method: 'POST',
                body: data
            });
            const file = await response.json();
            setImage(file.secure_url); // Set image URL
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAdmin = () => {
        actions.addNewAdmin(inputEmail, inputName, inputUserName, inputPassword, image); // Pass image URL
        setInputname(""); 
        setInputEmail(""); 
        setInputUserName("");
        setInputPassword("");
        setImage("");
    };

    return (
        <div className="container">
            <h1 style={{ marginTop: "100px" }}>Crea un nuevo usuario admin </h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nombre del Admin</label>
                    <input type="text" className="form-control" id="name" value={inputName} onChange={(e) => setInputname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input type="text" className="form-control" id="user_name" value={inputUserName} onChange={(e) => setInputUserName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="file">Foto</label>
                    <input type="file" className="form-control" name="file" id="file" onChange={uploadImage} />
                    {loading ? <h3>Loading...</h3> : image && <img src={image} alt="Admin" style={{ width: '100px' }} />}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" className="form-control" id="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                </div>
                
                <Link to={"/admins"}>
                    <button type="button" className="btn btn-primary" onClick={handleCreateAdmin}>
                        Crear Usuario Admin
                    </button>
                </Link>
                <Link to={"/admins"}> O deseas volver </Link>
            </form>
        </div>
    );
};