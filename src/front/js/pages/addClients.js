import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const AddClients = () => {
   
   
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
   
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [authClientId, setAuthClientId] = useState(null);

    useEffect(() => {
        if (authClientId) {
            navigate(`/updateInfo/${authClientId}`);
        }
    }, [authClientId, navigate]);

    return (
        <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
            <div style={{
                maxWidth: "600px",
                margin: "0 auto",
                padding: "2rem",
                boxShadow: "0px 0 30px rgba(1, 41, 112, 0.1)",
                borderRadius: "10px",
                backgroundColor: "#ffffff"
            }}>
                <h3 style={{
                    fontFamily: '"Poppins", sans-serif',
                    color: "#012970",
                    fontWeight: "500",
                    textAlign: "center"
                }}>Create New Client</h3>
                <form>
                   
                   
                  
                   
                   
                  
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                        />
                    </div>
                   
                    <div className="form-group">
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
                        className="btn"
                        style={{
                            marginTop: "1rem",
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "5px",
                            backgroundColor: "#e75b1e",
                            color: "#fff"
                        }}
                        onClick={async () => {
                            const newClient = await actions.addUser(
                              
                              
                               
                                inputEmail,
                               
                                inputPassword
                            );

                            if (newClient) {
                                setAuthClientId(newClient.id);
                            }

                            setInputEmail("");
                            
                            setInputPassword("");
                           
                        }}
                    >
                        Create Client
                    </button>
                    <Link to={"/"}>
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
    );
};