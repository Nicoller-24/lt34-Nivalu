import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { NavbarClient } from "../component/navbarclient";

export const EditClient = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);

    const [updateData, setUpdateData] = useState({
        name: '',
        last_name: '',
        email: '',
        identification_number: '',
        phone_number: ''
    });
    const [offcanvasOpen, setOffcanvasOpen] = useState(false);

    const fetchClient = () => {
        fetch(`${process.env.BACKEND_URL}/api/client/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUpdateData({
                    name: data.name || '',
                    last_name: data.last_name || '',
                    email: data.email || '',
                    identification_number: data.identification_number || '',
                    phone_number: data.phone_number || '',
                });
            })
            .catch((error) => console.error("Error loading client:", error));
    };

    useEffect(() => {
        fetchClient();
    }, [params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !updateData.name ||
            !updateData.last_name ||
            !updateData.email ||
            !updateData.identification_number ||
            !updateData.phone_number
        ) {
            alert("All fields are required.");
            return;
        }

        actions.updateUser(updateData, params.id)
            .then(() => alert("Client updated successfully."))
            .catch((error) => {
                alert("Error updating client.");
                console.error(error);
            });
    };

    const handleOffcanvasToggle = (isOpen) => {
        setOffcanvasOpen(isOpen);
    };

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
            <NavbarClient id={params.id} onToggle={handleOffcanvasToggle} />
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
                    }}
                >
                    Edit Your Profile
                </h1>
                <div
                    style={{
                        padding: "1rem",
                        boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <h3 style={{ fontFamily: '"Poppins", sans-serif', color: "#012970", fontWeight: "500" }}>
                        Account Details
                    </h3>
                    <form style={{ fontFamily: '"Open Sans", sans-serif' }} onSubmit={handleSubmit}>
                        <div style={{ display: "flex", gap: "20px", marginBottom: "1rem" }}>
                            <div style={{ flex: 1 }}>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={updateData.name}
                                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={updateData.last_name}
                                    onChange={(e) => setUpdateData({ ...updateData, last_name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "20px", marginBottom: "1rem" }}>
                            <div style={{ flex: 1 }}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={updateData.email}
                                    onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>Identification Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={updateData.identification_number}
                                    onChange={(e) =>
                                        setUpdateData({ ...updateData, identification_number: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "20px", marginBottom: "1rem" }}>
                            <div style={{ flex: 1 }}>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={updateData.phone_number}
                                    onChange={(e) => setUpdateData({ ...updateData, phone_number: e.target.value })}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            style={{
                                marginTop: "1rem",
                                width: "22%",
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
                    </form>
                </div>
            </div>
        </div>
    );
};
