import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { NavbarAdmin } from "./navbaradmin";

export const EditAdmin = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();

    const preset_name = "nivalu";
    const cloud_name = "duh7wjna3";

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [updateData, setUpdateData] = useState({
        name: "",
        user_name: "",
        email: "",
    });
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
    };

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", preset_name);

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: "POST",
                body: data,
            });

            const file = await response.json();
            setImage(file.secure_url);
            setLoading(false);
        } catch (error) {
            console.error("Error uploading image:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            actions.traer_admin(id).then((admin) => {
                setUpdateData({
                    name: admin.name || "",
                    user_name: admin.user_name || "",
                    email: admin.email || "",
                });
                setImage(admin.image_url || "");
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            const updatedAdminData = { ...updateData, image_url: image };
            actions.editAdmin(updatedAdminData, id);
        }
    };

    return (
        <>
            {store.admin_auth ? null : <Navigate to="/adminlogin" />}
            <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
                <NavbarAdmin id={id} onToggle={handleToggleOffcanvas} />

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
                        Edit Admin Profile
                    </h1>
                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                        }}
                    >
                        {/* Profile Photo Section */}
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
                            <h3
                                style={{
                                    fontFamily: '"Poppins", sans-serif',
                                    color: "#012970",
                                    fontWeight: "500",
                                }}
                            >
                                Profile Photo
                            </h3>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <img
                                    src={image}
                                    alt="Admin"
                                    style={{
                                        width: "100%",
                                        borderRadius: "50%",
                                        marginBottom: "1rem",
                                    }}
                                />
                            )}
                            <input
                                className="form-control"
                                type="file"
                                onChange={uploadImage}
                                style={{ marginTop: "1rem" }}
                            />
                        </div>

                        {/* Admin Details Section */}
                        <div
                            style={{
                                flex: 1,
                                padding: "1rem",
                                boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                                borderRadius: "10px",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: '"Poppins", sans-serif',
                                    color: "#012970",
                                    fontWeight: "500",
                                }}
                            >
                                Admin Details
                            </h3>
                            <form
                                style={{ fontFamily: '"Open Sans", sans-serif' }}
                                onSubmit={handleSubmit}
                            >
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <div style={{ flex: 1 }}>
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={updateData.name}
                                            onChange={(e) =>
                                                setUpdateData({ ...updateData, name: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={updateData.email}
                                            onChange={(e) =>
                                                setUpdateData({ ...updateData, email: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: "1rem" }}>
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={updateData.user_name}
                                        onChange={(e) =>
                                            setUpdateData({ ...updateData, user_name: e.target.value })
                                        }
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
                                <Link to={`/admins/${id}`} style={{ display: "block", marginTop: "1rem" }}>
                                    <button
                                        type="button"
                                        style={{
                                            width: "100%",
                                            padding: "0.5rem",
                                            backgroundColor: "#6c757d",
                                            color: "#fff",
                                            borderRadius: "5px",
                                            border: "none",
                                            cursor: "pointer",
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
        </>
    );
};
