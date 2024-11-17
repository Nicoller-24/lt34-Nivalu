import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { NavbarAdmin } from "./navbaradmin";

export const EditCategory = () => {
	const { actions } = useContext(Context);
	const params = useParams();


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
			if (params.id && !dataFetched) {  // Only fetch if data hasn't been fetched
				const category = await actions.traer_categoria(params.id);
				setUpdateData({
					name: category.name || '',
					image_url: category.image_url || ''
				});
				setDataFetched(true);  // Set flag to true after fetching data
				console.log("Fetched category data:", category); // Debugging
			}
		};
		fetchCategory();
	}, [params.id, actions, dataFetched]); // Add dataFetched to dependencies

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

	const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
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
		if (params.id) {
			actions.editCategory(updateData, params.id); // Save updates
			actions.loadSomeDataCategory();
			console.log("Form submitted with data:", updateData); // Debugging
		}
	};

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
            <NavbarAdmin id={params.id_admin} onToggle={handleToggleOffcanvas} />
            <div
                className="page-content"
                style={{
                    padding: "2rem",
                    transition: "margin-left 0.3s ease",
                    marginLeft: isOffcanvasOpen ? "300px" : "0",
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
                        marginTop: "4rem",
                    }}
                >
                    Edit Category
                </h1>
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                    }}
                >
                    {/* Left Section - Image */}
                    <div
                        style={{
                            width: "30%",
                            padding: "1rem",
                            boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            textAlign: "center",
                            height: "fit-content",
                        }}
                    >
                        <h3 style={{ fontFamily: '"Poppins", sans-serif', color: "#012970", fontWeight: "500" }}>
                            Category Photo
                        </h3>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            updateData.image_url && (
                                <img
                                    src={updateData.image_url}
                                    alt="Category"
                                    style={{
                                        width: "100%",
                                        borderRadius: "10px",
                                        marginBottom: "1rem",
                                    }}
                                />
                            )
                        )}
                        <input
                            className="form-control"
                            type="file"
                            onChange={uploadImage}
                            style={{ marginTop: "1rem" }}
                        />
                    </div>

                    {/* Right Section - Details */}
                    <div
                        style={{
                            flex: 1,
                            padding: "1rem",
                            boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                        }}
                    >
                        <h3 style={{ fontFamily: '"Poppins", sans-serif', color: "#012970", fontWeight: "500" }}>
                            Category Details
                        </h3>
                        <form style={{ fontFamily: '"Open Sans", sans-serif' }} onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "1rem" }}>
                                <label
                                    style={{
                                        fontFamily: '"Poppins", sans-serif',
                                        color: "#012970",
                                        marginBottom: "0.5rem",
                                        display: "block",
                                    }}
                                >
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={updateData.name}
                                    onChange={handleInputChange}
                                    required
                                />
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
                                }}
                            >
                                Save Changes
                            </button>
                            <Link to={`/categories/${params.id_admin}`}>
                                <button
                                    type="button"
                                    style={{
                                        marginTop: "0.5rem",
                                        width: "100%",
                                        padding: "0.5rem",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        backgroundColor: "#6c757d",
                                    }}
                                >
                                    Go Back
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
