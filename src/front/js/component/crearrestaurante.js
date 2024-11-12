import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import AddressAutocomplete from "./addressautocomplete";
import MapComponent from "./mapcomponet";

export const Crearrestaurante = () => {
    const [inputName, setInputname] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputGuestCapacity, setInputGuestCapacity] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [selectedAddress, setSelectedAddress] = useState(""); 
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [authRestaurantId, setAuthRestaurantId] = useState(null);

    const preset_name = "nivalu";                         
    const cloud_name = "duh7wjna3";                     
    const [image, setImage] = useState("");      
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authRestaurantId) {
            navigate(`/restaurants/${authRestaurantId}`);
        }
    }, [authRestaurantId, navigate]);

    const uploadImage = async (e) => {            
        const files = e.target.files;            
        const data = new FormData();             
        data.append("file", files[0]);           
        data.append("upload_preset", preset_name);

        setLoading(true);                        

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: "POST",
                body: data
            });

            const file = await response.json();     
            setImage(file.secure_url);              
            setLoading(false);                      
        } catch (error) {
            console.error("Error uploading image:", error);
            setLoading(false);
        }
    };

    const handleAddressSelect = (address, location) => {
        setSelectedAddress(address);
        setSelectedLocation(location);
    };

    return (
        <>  
            <div style={{ display: "flex", gap: "20px", padding: "2rem" }}>
                {/* Left Section - Profile Image */}
                <div style={{
                    width: "30%",
                    padding: "1rem",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    backgroundColor: "#f8f9fa",
                    textAlign: "center"
                }}>
                    <h3>Restaurant Photo</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <img src={image} alt="Profile" style={{
                            width: "100%",
                            borderRadius: "50%",
                            marginBottom: "1rem"
                        }} />
                    )}
                    <input type="file" onChange={uploadImage} style={{ marginTop: "1rem" }} />
                </div>

                {/* Right Section - Restaurant Details */}
                <div style={{
                    flex: 1,
                    padding: "1rem",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff"
                }}>
                    <h3>Create New Restaurant</h3>
                    <form>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <div style={{ flex: 1 }}>
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={inputName}
                                    onChange={(e) => setInputname(e.target.value)}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "20px", marginTop: "1rem" }}>
                            <div style={{ flex: 1 }}>
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    value={inputPhone}
                                    onChange={(e) => setInputPhone(e.target.value)}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>Guest Capacity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={inputGuestCapacity}
                                    onChange={(e) => setInputGuestCapacity(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                            <label>Address</label>
                            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
                            {selectedLocation && (
                                <MapComponent initialPosition={selectedLocation} />
                            )}
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginTop: "1rem", width: "100%", padding: "0.5rem", borderRadius: "5px" }}
                            onClick={async () => {
                                const newRestaurant = await actions.addNewRestaurant(
                                    inputEmail,
                                    inputGuestCapacity,
                                    selectedAddress,
                                    inputName,
                                    inputPhone,
                                    inputPassword,
                                    image,
                                    selectedLocation?.lat,
                                    selectedLocation?.lng
                                );

                                if (newRestaurant) {
                                    setAuthRestaurantId(newRestaurant.id);
                                }

                                setInputGuestCapacity("");
                                setInputname("");
                                setInputPhone("");
                                setInputEmail("");
                                setInputPassword("");
                                setImage("");
                            }}
                        >
                            Create Restaurant
                        </button>
                        <Link to={"/restauranteselect"}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                style={{
                                    marginTop: "0.5rem",
                                    width: "100%",
                                    padding: "0.5rem",
                                    backgroundColor: "#6c757d",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Or Go Back
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};
