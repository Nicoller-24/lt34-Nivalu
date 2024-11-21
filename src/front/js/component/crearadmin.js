import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Crearadmin = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [inputName, setInputname] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputUserName, setInputUserName] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [createdAdminId, setCreatedAdminId] = useState(null); // Estado para guardar el ID del admin creado

    const preset_name = "nivalu";
    const cloud_name = "duh7wjna3";

    useEffect(() => {
        if (createdAdminId) {
            navigate(`/admins/list/${createdAdminId}`); // Redirige cuando se obtiene el ID
        }
    }, [createdAdminId, navigate]);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", preset_name);

        setLoading(true);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            const file = await response.json();
            setImage(file.secure_url);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAdmin = async () => {
        const newAdmin = await actions.addNewAdmin(
            inputEmail,
            inputName,
            inputUserName,
            inputPassword,
            image
        );

        if (newAdmin) {
            setCreatedAdminId(newAdmin.id); // Guarda el ID del admin creado para redirigir
        }

        // Limpia los campos después de la creación
        setInputname("");
        setInputEmail("");
        setInputUserName("");
        setInputPassword("");
        setImage("");
    };

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
            <div style={{ display: "flex", gap: "20px", padding: "2rem" }}>
                {/* Left Section - Profile Image */}
                <div
                    style={{
                        width: "30%",
                        padding: "1rem",
                        boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                        borderRadius: "10px",
                        backgroundColor: "white",
                        textAlign: "center",
                    }}
                >
                    <h3
                        style={{
                            fontFamily: '"Poppins", sans-serif',
                            color: "#012970",
                            fontWeight: "500",
                        }}
                    >
                        Admin Photo
                    </h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        image && (
                            <img
                                src={image}
                                alt="Profile"
                                style={{
                                    width: "100%",
                                    borderRadius: "50%",
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

                {/* Right Section - Admin Details */}
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
                        Create New Admin
                    </h3>
                    <form style={{ fontFamily: '"Open Sans", sans-serif' }}>
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
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={inputUserName}
                                    onChange={(e) => setInputUserName(e.target.value)}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn"
                            style={{
                                marginTop: "1rem",
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "5px",
                                backgroundColor: "#e75b1e",
                                color: "#fff",
                            }}
                            onClick={handleCreateAdmin}
                        >
                            Create Admin
                        </button>
                        <Link to={"/adminhomepage"}>
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
                                    cursor: "pointer",
                                }}
                            >
                                Go back 
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
