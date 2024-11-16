import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const NavbarRestaurant = ({ id, onToggle }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState({});
    const [offcanvasOpen, setOffcanvasOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const [reservationsOpen, setReservationsOpen] = useState(false);

    const logout = () => {
        actions.logoutrestaurant();
        navigate("/restauranteselect");
        store.restaurant_auth = false;
    };

    const getChats = () => {
        fetch(`${process.env.BACKEND_URL}/api/chat/restaurant/${id}`)
          .then((response) => response.json())
          .then((data) => setChats(data))
          .catch((error) => console.error("Error al cargar los chats:", error));
      }

    const fetchRestaurant = () => {
        fetch(`${process.env.BACKEND_URL}/api/restaurant/${id}`)
            .then((response) => response.json())
            .then((data) => setRestaurant(data))
            .catch((error) => console.error("Error loading restaurant:", error));
    };

    useEffect(() => {
        fetchRestaurant();
        getChats()
    }, [id]);

    const toggleOffcanvas = () => {
        const newOffcanvasState = !offcanvasOpen;
        setOffcanvasOpen(newOffcanvasState);
        document.body.classList.toggle("offcanvas-open", newOffcanvasState);

        if (onToggle) {
            onToggle(newOffcanvasState);
        }
    };

    const toggleReservationsDropdown = () => {
        setReservationsOpen(!reservationsOpen);
    };

    return (
        <>
            <nav
                className="navbar"
                style={{
                    backgroundColor: "#ffffff",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    zIndex: "1000",
                    boxShadow: "0px 4px 8px rgba(0, 0, 255, 0.2)",
                    fontFamily: '"Nunito", sans-serif'
                }}
            >
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="navbar-brand d-flex align-items-center">
                        <img src="https://via.placeholder.com/40" alt="Logo" style={{ width: "40px", height: "40px" }} />
                        <h1 className="ms-2" style={{ fontSize: "1.5rem", color: "#050090" }}>Nivalu</h1>
                        <button
                            className="offcanvas-button ms-2"
                            onClick={toggleOffcanvas}
                            style={{ backgroundColor: "white", border: "none" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#050090" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </button>
                    </div>
                    <ul className="navbar-nav d-flex flex-row align-items-center">
                        <li className="nav-item position-relative mx-3">
                            <div className="dropdown">
                                <button 
                                    onClick={() => console.log(chats)}
                                    style={{ backgroundColor: "white", border: "none", position: "relative" }}
                                    className="dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="#050090"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                    </svg>
                                    <span
                                        className="badge bg-success badge-number"
                                        style={{
                                            position: "absolute",
                                            top: "-3px",
                                            right: "5px",
                                            padding: "4px 6px",
                                            borderRadius: "50%",
                                            fontSize: "0.7rem",
                                            color: "white",
                                            lineHeight: "1",
                                        }}
                                    >
                                        {chats.length}
                                    </span>
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    style={{
                                        position: "absolute",
                                        top: "100%", 
                                        right: "0",
                                        zIndex: "1000",
                                        minWidth: "200px", 
                                    }}
                                >
                                    {chats.map((item, index) => (
                                        <li key={index}>
                                            <Link to={`/restaurant/chat/${id}`} className="dropdown-item">
                                                {item.comensal_details.name} {item.comensal_details.last_name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item dropdown mx-3">
                            <a
                                className="nav-link dropdown-toggle d-flex align-items-center"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ whiteSpace: "nowrap", color: "#050090" }}
                            >
                                <img src={restaurant.image_url} alt="Profile" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
                                <span className="ms-2">{restaurant.name}</span>
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdown"
                                style={{
                                    position: "absolute",
                                    top: "100%", 
                                    right: "0",
                                    zIndex: "1000",
                                    minWidth: "200px", 
                                }}
                            >
                                <li><Link className="dropdown-item" to={`/restaurant/${id}`} style={{ color: "#050090" }}>View Profile</Link></li>
                                <li><Link className="dropdown-item" to={`/edit/restaurant/${id}`} style={{ color: "#050090" }}>Settings</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                {store.restaurant_auth ? (
                                    <li onClick={logout} className="dropdown-item" style={{ color: "#050090" }}>
                                        Log out
                                    </li>
                                ) : null}
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Offcanvas side menu styled */}
            <div
                style={{
                    position: "fixed",
                    top: "71px",
                    bottom: "0",
                    left: offcanvasOpen ? "0" : "-300px",
                    width: "300px",
                    zIndex: 996,
                    transition: "all 0.3s ease",
                    padding: "20px",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#aab7cf transparent",
                    boxShadow: "0px 0px 20px rgba(1, 41, 112, 0.1)",
                    backgroundColor: "#fff",
                    color: "#050090"
                }}
            >
                <ul 
                className="list-unstyled"
                style={{ fontFamily: '"Open Sans", sans-serif', fontSize: "16px", }}
                >
                    <li>
                        <Link className="dropdown-item" to={`/restaurant/${id}`} style={{ color: "#012970" , }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#899bbd" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to={`/restaurants/${id}`} style={{ color: "#012970" }}>
                            <svg style={{ verticalAlign: "-4px", marginRight: "8px"}}xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#899bbd" class="bi bi-list-ul" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                            </svg>
                             View Restaurants
                        </Link>
                    </li>
                    <li><Link to="/reservationsRestaurant" className="dropdown-item" style={{ color: "#012970" }}>Reservation Requests</Link></li>
                    <hr className="dropdown-divider" />
                    <li><Link className="dropdown-item" to={`/restaurant/chat/${id}`} style={{ color: "#012970" }}><i className="bi bi-chat-dots"></i> Chats</Link></li>
                    <li><Link className="dropdown-item" to={`/edit/restaurant/${id}`} style={{ color: "#012970" }}><i className="bi bi-gear"></i> Edit Profile</Link></li>
                    {store.restaurant_auth ? (
                        <li onClick={logout} className="dropdown-item" style={{ color: "#012970" }}><i className="bi bi-box-arrow-right"></i> Log out</li>
                    ) : null}
                </ul>
            </div>
        </>
    );
};
