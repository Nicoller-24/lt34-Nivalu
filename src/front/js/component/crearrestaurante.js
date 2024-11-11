import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "./addressautocomplete";
import MapComponent from "./mapcomponet";
import { jwtDecode } from "jwt-decode";

export const Crearrestaurante = () => {
    const [inputName, setInputname] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputGuestCapacity, setInputGuestCapacity] = useState("");
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);
    const [selectedAddress, setSelectedAddress] = useState(''); 
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [authRestaurantId, setAuthRestaurantId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setAuthRestaurantId(decoded.sub);
        }

    }, []);
    
    const preset_name = "nivalu";                         
    const cloud_name = "duh7wjna3"                     

    const [ image, setImage ] = useState('');      
    const [ loading, setLoading ] = useState(false) 
  

    const uploadImage = async (e)=>{            
        const files = e.target.files            
        const data = new FormData()             
        data.append('file', files[0])           
        data.append('upload_preset',preset_name)  

        setLoading(true)                        

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();     
            setImage(file.secure_url);              
            setLoading(false);                      
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }

    }


    const handleAddressSelect = (address, location) => {
        setSelectedAddress(address);
        setSelectedLocation(location); 
        console.log("Dirección seleccionada:", address);
        console.log("Coordenadas seleccionadas:", location);
    };

    return (
        <>  

        {store.restaurant_auth ? <Navigate to={`/restaurants/${authRestaurantId}`}/> :(


            <div className="container">
                <h1 style={{ marginTop: "100px" }}>Crea un nuevo restaurante</h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Restaurante</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={inputName}
                            onChange={(e) => setInputname(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Número de teléfono</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            value={inputPhone}
                            onChange={(e) => setInputPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                            <label htmlFor="address">Dirección</label>
                            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
                            {selectedLocation && (
                                <MapComponent initialPosition={selectedLocation} />
                            )}
                            
                    </div>
                    <div className="form-group">
                        <label htmlFor="guests_capacity">Capacidad de invitados</label>
                        <input
                            type="number"
                            className="form-control"
                            id="guests_capacity"
                            value={inputGuestCapacity}
                            onChange={(e) => setInputGuestCapacity(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                        />
                    </div>

                    <div  className="form-group">
                    <label htmlFor="file">Foto</label>
                        <input type="file"
                        className="form-control"
                        name="file"
                        id="file"
                        placeholder='Upload an image'
                        // accept='image/png, image/jpeg' 
                        onChange={(e)=>uploadImage(e)}
                        />

                        {loading ? (
                            <h3>Loading...</h3>
                        ) : (
                        <img src={image} alt="imagen subida"/>
                        )}
                    </div>

                        <button type="button" className="btn btn-primary" style={{"marginRight": "10px"}} onClick={() => {actions.addNewRestaurant(inputEmail, inputGuestCapacity, selectedAddress, inputName, inputPhone, inputPassword, image, selectedLocation.lat, selectedLocation.lng ); 
                           
                           
                           setInputGuestCapacity("");
                            setInputname(""); 
                            setInputPhone("");
                            setInputEmail("") ; 
                            setInputPassword("");
                            setImage("")
                        }}>
                            Crear Restaurante
                        </button>
                    <Link to={"/restauranteselect"}>
                        O deseas volver
                    </Link>
                </form>
            </div>
        )}
        </>
    );
};
