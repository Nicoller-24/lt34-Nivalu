import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import AddressAutocomplete from "./addressautocomplete";
import MapComponent from "./mapcomponet";
import { NavbarRestaurant } from "./navbarestaurant";
import { Navigate } from "react-router-dom";

export const Edit = () => {
    const [restaurantData, setRestaurantData] = useState(null);
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputGuestCapacity, setInputGuestCapacity] = useState("");
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [offcanvasOpen, setOffcanvasOpen] = useState(false);

    const { store, actions } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();

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
            setImage(file.secure_url);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    const traer_restaurante = () => {
        fetch(process.env.BACKEND_URL + `/api/restaurant/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurantData(data);
                setInputName(data.name || "");
                setInputEmail(data.email || "");
                setInputPhone(data.phone_number || "");
                setSelectedAddress(data.location || "");
                setImage(data.image_url || "");
                setSelectedCategories(data.categories.map(cat => cat.id));

                if (data.latitude && data.longitude) {
                    setSelectedLocation({
                        lat: parseFloat(data.latitude),
                        lng: parseFloat(data.longitude),
                    });
                }
                setInputGuestCapacity(data.guests_capacity || "");
            })
            .catch((error) => console.error("Error loading restaurant:", error));
    };

    const fetchCategories = () => {
        fetch(process.env.BACKEND_URL + "/api/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error loading categories:", error));
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter((id) => id !== categoryId)
                : [...prevSelected, categoryId]
        );
    };

    const putRestaurant = () => {
        return fetch(process.env.BACKEND_URL + `/api/restaurant/${params.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: inputEmail || restaurantData?.email,
                guests_capacity: inputGuestCapacity || restaurantData?.guests_capacity,
                location: selectedAddress || restaurantData?.location,
                name: inputName || restaurantData?.name,
                phone_number: inputPhone || restaurantData?.phone_number,
                image_url: image || restaurantData?.image_url,
                latitude: parseFloat(selectedLocation?.lat || restaurantData?.latitude),
                longitude: parseFloat(selectedLocation?.lng || restaurantData?.longitude),
                category_ids: selectedCategories,
            }),
        })
            .then((response) => response.text())
            .then(() => actions.loadSomeData())
            .catch((error) => console.error("Error saving restaurant:", error));
    };

    useEffect(() => {
        traer_restaurante();
        fetchCategories();
    }, [params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        putRestaurant().then(() => navigate(`/restaurant/${params.id}`));
    };

    const handleAddressSelect = (address, location) => {
        setSelectedAddress(address);
        setSelectedLocation(location);
    };

    const handleOffcanvasToggle = (isOpen) => {
        setOffcanvasOpen(isOpen);
    };

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
            {store.restaurant_auth ? null : <Navigate to="/restauranteselect" />}
            <NavbarRestaurant id={params.id} onToggle={handleOffcanvasToggle} />

            <div
                className="page-content"
                style={{
                    padding: "2rem",
                    transition: "margin-left 0.3s ease",
                    marginLeft: offcanvasOpen ? "300px" : "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",
                        fontFamily: "Nunito, sans-serif",
                        color: "#012970",
                        marginTop: "4rem"
                       
                    }}
                >
                    Edit your profile
                </h1>
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                    }}
                >
                    <div
                        style={{
                            width: "30%",
                            padding: "1rem",
                            boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            textAlign: "center",
                            height: "fit-content"
                        }}
                    >
                        <h3 style={{fontFamily: '"Poppins", sans-serif', color: "#012970", fontWeight: "500"}} >Profile Photo</h3>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <img
                                src={image}
                                alt="Profile"
                                style={{
                                    width: "100%",
                                    borderRadius: "50%",
                                    marginBottom: "1rem",
                                }}
                            />
                        )}
                        <input className="form-control" type="file" onChange={uploadImage} style={{ marginTop: "1rem" }} />
                    </div>

                    <div
                        style={{
                            flex: 1,
                            padding: "1rem",
                            boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                        }}
                    >
                        <h3 style={{fontFamily: '"Poppins", sans-serif', color: "#012970", fontWeight: "500"}}>Account Details</h3>
                        <form style={{fontFamily: '"Open Sans", sans-serif'}} onSubmit={handleSubmit}>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <div style={{ flex: 1 }}>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={inputName}
                                        onChange={(e) => setInputName(e.target.value)}
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
                                <AddressAutocomplete
                                    onAddressSelect={handleAddressSelect}
                                    initialAddress={selectedAddress}
                                />
                                {selectedLocation && (
                                    <MapComponent
                                        initialPosition={selectedLocation}
                                        onLocationSelect={(location) =>
                                            setSelectedLocation(location)
                                        }
                                    />
                                )}
                            </div>
                            <div style={{ marginTop: "1rem" }}>
                                <label>Select Categories</label>
                                <div>
                                    {categories.map((category) => (
                                        <label key={category.id} style={{ display: "block" }}>
                                            <input
                                                type="checkbox"
                                                value={category.id}
                                                checked={selectedCategories.includes(category.id)}
                                                onChange={() =>
                                                    handleCategoryChange(category.id)
                                                }
                                            />
                                            {category.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                style={{
                                    marginTop: "1rem",
                                    width: "100%",
                                    padding: "0.5rem",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    backgroundColor: "#e75b1e",
                                    color: "#fff",
                                }}
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
