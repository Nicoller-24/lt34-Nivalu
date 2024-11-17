import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NavbarAdmin } from "./navbaradmin";

export const Crearocasion = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    const [inputName, setInputname] = useState("");
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleToggleOffcanvas = (state) => {
        setIsOffcanvasOpen(state);
    };

    const handleCreateOcasion = async () => {
        const newOcasion = await actions.addNewOcasion(inputName);
        // Clear input field after creation
        setInputname("");
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
                <h3
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        color: "#012970",
                        fontWeight: "500",
                        paddingTop: "4rem"
                    }}
                >
                    Create New Occasion
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
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateOcasion();
                        }}
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
                                value={inputName}
                                onChange={(e) => setInputname(e.target.value)}
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
                            Create Occasion
                        </button>
                        <Link to={`/ocasiones/${params.id}`}>
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
