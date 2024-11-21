import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { NavbarAdmin } from "./navbaradmin";

export const Crearcategoria = () => {
    const [inputName, setInputname] = useState("");
    const { actions } = useContext(Context);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const params = useParams();

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
                body: data,
            });
            const file = await response.json();
            setImage(file.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.addNewCategory(inputName, image);
        actions.loadSomeDataCategory();
        setInputname("");
        setImage("");
    };

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
    };

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
            <NavbarAdmin id={params.id} onToggle={handleToggleOffcanvas} />
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
                    Create New Category
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
                            image && (
                                <img
                                    src={image}
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
                                    value={inputName}
                                    onChange={(e) => setInputname(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                onClick={()=> actions.loadSomeDataCategory()}
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
                                Create Category
                            </button>
                            <Link to={`/categories/${params.id}`}>
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
