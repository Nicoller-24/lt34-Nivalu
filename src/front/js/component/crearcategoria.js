import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crearcategoria = () => {
    const [inputName, setInputname] = useState("");
    const { actions } = useContext(Context);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const preset_name = "nivalu";                         
    const cloud_name = "duh7wjna3";                  

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
            setImage(file.secure_url);  // Save the URL from Cloudinary
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.addNewCategory(inputName, image);  // Pass the Cloudinary image URL to the action
        setInputname(""); // Clear the input after submission
        setImage("");
    };

    return (
        <div className="container">
            <h1 style={{ marginTop: "100px" }}>Crea una nueva categoria</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre de la categoria</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={inputName}
                        onChange={(e) => setInputname(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="file">Foto</label>
                    <input type="file" className="form-control" name="file" id="file" onChange={uploadImage} />
                    {loading ? <h3>Loading...</h3> : image && <img src={image} alt="Category" style={{ width: '100px' }} />}
                </div>

                <button type="submit" className="btn btn-primary" style={{"marginRight": "10px"}}>
                    Crear Nueva Categoria
                </button>
                <Link to={"/categories"}>O deseas volver</Link>
            </form>
        </div>
    );
};