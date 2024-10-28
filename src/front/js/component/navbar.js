import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	function handleLogoutClient(){
		actions.logoutClient()
		navigate("/loginClient")

    }


	return (
		<nav className="navbar bg-primary" data-bs-theme="dark">
            <div className="container">
                NIVALU
                

               
                <div className="d-flex align-items-center">
                    {store.auth ? (
                        <button onClick={handleLogoutClient} className="btn btn-primary">Logout</button>
                    ) : (
                        <Link to="/loginClients">
                            <button className="btn btn-outline-primary mr-3">Login</button>
                        </Link>
                    )}
					
                </div>
            </div>
        </nav>
	);
};

