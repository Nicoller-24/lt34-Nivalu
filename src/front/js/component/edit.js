import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import AddressAutocomplete from "./addressautocomplete";
import MapComponent from "./mapcomponet";
import { NavbarRestaurant } from "./navbarestaurant";

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
    
    const { store, actions } = useContext(Context);
    const params = useParams();

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

    // Fetch restaurant details
    function traer_restaurante() {
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
    }

    // Fetch all categories
    function fetchCategories() {
        fetch(process.env.BACKEND_URL + "/api/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error loading categories:", error));
    }

    // Handle category selection
    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter((id) => id !== categoryId)
                : [...prevSelected, categoryId]
        );
    };

    function putRestaurant() {
        fetch(process.env.BACKEND_URL + `/api/restaurant/${params.id}`, {
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
        .then((response) => {
            actions.loadSomeData();
            return response.text();
        })
        .then((result) => {
            console.log("Result:", result);
        })
        .catch((error) => console.error("Error saving restaurant:", error));
    }

    useEffect(() => {
        traer_restaurante();
        fetchCategories();
    }, [params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleAddressSelect = (address, location) => {
        setSelectedAddress(address);
        setSelectedLocation(location);
    };

    return (
        <>
        
            <NavbarRestaurant  id={params.id}/>

            <div className="container" style={{ backgroundColor: "white", width: "70%", paddingBottom: "10%" }}>
                <h1 style={{ marginLeft: "30%" }}>Edit Restaurant</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="Email"
                            placeholder="Email"
                            onChange={(e) => setInputEmail(e.target.value)}
                            value={inputEmail}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="guestscapacity" className="form-label">Guests capacity</label>
                        <input
                            type="text"
                            className="form-control"
                            id="guestscapacity"
                            placeholder="Guests capacity"
                            onChange={(e) => setInputGuestCapacity(e.target.value)}
                            value={inputGuestCapacity}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Adress" className="form-label">Address</label>
                        <AddressAutocomplete
                            onAddressSelect={handleAddressSelect}
                            initialAddress={selectedAddress}
                        />
                        {selectedLocation && (
                            <MapComponent
                                initialPosition={selectedLocation}
                                onLocationSelect={(location) => setSelectedLocation(location)}
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            onChange={(e) => setInputName(e.target.value)}
                            value={inputName}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Phone"
                            placeholder="Phone"
                            onChange={(e) => setInputPhone(e.target.value)}
                            value={inputPhone}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">Foto</label>
                        <input
                            type="file"
                            className="form-control"
                            name="file"
                            id="file"
                            placeholder="Upload an image"
                            onChange={uploadImage}
                        />
                        {loading ? (
                            <h3>Loading...</h3>
                        ) : (
                            <img src={image} alt="imagen actual o subida" style={{ width: "100%", marginTop: "10px" }} />
                        )}
                    </div>
                    <div className="mb-3">
                        <h3>Select Categories</h3>
                        <ul>
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={category.id}
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={() => handleCategoryChange(category.id)}
                                        />
                                        {category.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to={`/restaurant/${params.id}`}>
                        <button
                            onClick={() => putRestaurant(inputEmail, inputGuestCapacity, selectedAddress, inputName, inputPhone, image, selectedLocation.lat, selectedLocation.lng)}
                            type="submit"
                            className="btn btn-primary w-100 mb-4"
                        >
                            Save
                        </button>
                    </Link>
                    <Link to={`/restaurant/${params.id}`}>
                        <button type="button" className="btn btn-secondary w-100">
                            O deseas volver
                        </button>
                    </Link>
                </form>
            </div>
        </>
    );
};