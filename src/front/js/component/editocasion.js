import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { NavbarAdmin } from "./navbaradmin";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const EditOcasion = () => {
    const { actions } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();

    const [updateData, setUpdateData] = useState({
        name: "",
    });

    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
    };

    useEffect(() => {
        if (params.id) {
            actions.traer_ocasion(params.id).then((ocasion) => {
                // Solo actualiza si el campo está vacío
                if (!updateData.name) {
                    setUpdateData({
                        name: ocasion.name || "",
                    });
                }
            });
        }
    }, [params.id, actions, updateData.name]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (params.id) {
            actions.editOcasion(updateData, params.id);
        }
        setUpdateData({
            name: "",
        });
        actions.loadSomeDataCategory();
        navigate(`/ocasiones/${params.id_admin}`)
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
                <h3
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        color: "#012970",
                        fontWeight: "500",
                        paddingTop: "4rem",
                    }}
                >
                    Edit Occasion
                </h3>
                <div
                    style={{
                        flex: 1,
                        padding: "2rem",
                        boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        maxWidth: "600px",
                    }}
                >
                    <form
                        style={{
                            fontFamily: '"Open Sans", sans-serif',
                            marginTop: "2rem",
                        }}
                        onSubmit={handleSubmit}
                    >
                        <div style={{ marginBottom: "1rem" }}>
                            <label
                                style={{
                                    fontFamily: '"Poppins", sans-serif',
                                    color: "#012970",
                                    marginBottom: "0.5rem",
                                    display: "block",
                                }}
                            >
                                Occasion Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={updateData.name}
                                onChange={(e) =>
                                    setUpdateData({ ...updateData, name: e.target.value })
                                }
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            style={{
                                marginTop: "1rem",
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "5px",
                                backgroundColor: "#e75b1e",
                                color: "#fff",
                            }}
                        >
                            Save Changes
                        </button>
                        <Link to={`/ocasiones/${params.id_admin}`}>
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
                                Or Go Back
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
