import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const NavbarRestaurant = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState({});


    
    
    function salir() {
        actions.logoutrestaurant();
        navigate("/restauranteselect");
        store.restaurant_auth = false;
    }
    
    const traer_restaurante = () => {
        fetch(`${process.env.BACKEND_URL}/api/restaurant/${props.id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("Datos del restaurante:", data);
            setRestaurant(data);
        })
        .catch((error) => console.error("Error al cargar el restaurante:", error));
    };

    useEffect(() => {
        
            traer_restaurante();
        
    }, []); 
    
    return (
        <>
            <nav className="navbar" style={{ backgroundColor: "#ffffff" }}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    {/* Logo */}
                    <div className="navbar-brand d-flex align-items-center">
                        <img src="https://via.placeholder.com/40" alt="Logo" style={{ width: "40px", height: "40px" }} />
                        <h1 className="ms-2" style={{ fontSize: "1.5rem", color: "#050090" }}>Nivalu</h1>
                        {/* Button to open the offcanvas menu */}
                        <button
                            style={{ backgroundColor: "white", border: "none" }}
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasScrolling"
                            aria-controls="offcanvasScrolling"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#050090" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </button>
                    </div>

                    {/* Message and profile icons on the right */}
                    <ul className="navbar-nav d-flex flex-row align-items-center">
                        {/* Message icon */}
                        <li className="nav-item position-relative mx-3">
                            <Link className="nav-link" to="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#050090" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                </svg>
                            </Link>
                        </li>

                        {/* Profile dropdown */}
                        <li className="nav-item dropdown mx-3">
                            <a
                                className="nav-link dropdown-toggle d-flex align-items-center"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                <img src={restaurant.image_url} alt="Profile" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
                                <span className="ms-2">{restaurant.name}</span>
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdown"
                                style={{
                                    position: "absolute",
                                    top: "100%", // So it displays below the profile link
                                    right: "0",
                                    zIndex: "1000",
                                    minWidth: "200px", // Adjust width as needed
                                }}
                            >
                                <li><Link className="dropdown-item" to={`/restaurant/${props.id}`}>View Profile</Link></li>
                                <li><Link className="dropdown-item" to={`/edit/restaurant/${props.id}`}>Settings</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                {store.restaurant_auth ? (
                                    <li onClick={() => salir()}  className="dropdown-item">
                                        Log out
                                    </li>) : null}
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Offcanvas side menu below the navbar */}
            <div
                className="offcanvas offcanvas-start"
                style={{ top: "73px", width: "260px" }}
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex="-1"
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Navigation</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="list-unstyled">
                        <li><Link className="dropdown-item" to={`/restaurant/${props.id}`}>Profile</Link></li>
                        <li><Link className="dropdown-item" to={`/restaurants/${props.id}`}>View Restaurants</Link></li>
                        <li><Link className="dropdown-item" to="/reservations/requests">Reservation Requests</Link></li>
                        <li><Link className="dropdown-item" to="/reservations">Reservations</Link></li>
                        <hr className="dropdown-divider" />
                        <li><Link className="dropdown-item" to={"/restaurant/chat/" + props.id}>Chats</Link></li>
                        <li><Link className="dropdown-item" to={`/edit/restaurant/${props.id}`}>Edit Profile</Link></li>
                        {store.restaurant_auth ? (
                        <li onClick={() => salir()}  className="dropdown-item">
                            Log out
                        </li>) : null}
                    </ul>
                </div>
            </div>
        </>
    );
};
