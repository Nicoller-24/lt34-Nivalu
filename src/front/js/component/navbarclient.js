import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/nivalulogo.jpg";


export const NavbarClient = ({ id, onToggle }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [clientData, setClientData] = useState({});
    const [offcanvasOpen, setOffcanvasOpen] = useState(false);
    const [chats, setChats] = useState([]);

    const logout = () => {
        actions.logoutClient();
        navigate("/");
        store.client_auth = false;
    };

    function getChats() {
        fetch(`${process.env.BACKEND_URL}/api/chat/client/${id}`)
          .then((response) => response.json())
          .then((data) => setChats(data))
          .catch((error) => console.error("Error al cargar los chats:", error));
    }

    const fetchClient = () => {
        fetch(`${process.env.BACKEND_URL}/api/client/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setClientData(data);  
        })
        .catch((error) => {
            console.error("Error loading client:", error);  
        });
    };

    useEffect(() => {
        fetchClient();
        getChats();
    }, [id]);

    const toggleOffcanvas = () => {
        const newOffcanvasState = !offcanvasOpen;
        setOffcanvasOpen(newOffcanvasState);
        document.body.classList.toggle("offcanvas-open", newOffcanvasState);

        if (onToggle) {
            onToggle(newOffcanvasState);
        }
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
                    <img src={logo} alt="Logo" style={{ width: "125px", height: "40px" }} />
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
                    <ul  style={{marginRight: "2rem"}} className="navbar-nav d-flex flex-row align-items-center">
                        <li className="nav-item position-relative mx-3">
                            <div className="dropdown">
                                <button
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
                                            <Link to={`/client/chat/${id}`} className="dropdown-item">
                                                {item.restaurant_details.name} {item.restaurant_details.last_name}
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
                                <span className="ms-2">{clientData.name} {clientData.last_name}</span> {/* Display client name */}
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
                                <li><Link className="dropdown-item" to={`/clientdetails/${id}`} style={{ color: "#050090" }}>View Profile</Link></li>
                                <li><Link className="dropdown-item" to={`/updateInfo/${id}`} style={{ color: "#050090" }}>Settings</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                {store.client_auth ? (
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
                    top: "66px",
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
                    <li style={{ marginBottom: "15px" }}>
                        <Link className="dropdown-item" to={`/clientdetails/${id}`} style={{ color: "#012970" , }}>
                            <svg style={{ verticalAlign: "-4px", marginRight: "8px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#899bbd" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                            Profile
                        </Link>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                        <Link className="dropdown-item" to={`/listOfRestaurants/${id}`} style={{ color: "#012970" }}>
                            <svg style={{ verticalAlign: "-4px", marginRight: "8px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#899bbd" className="bi bi-list-ul" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                            </svg>
                             View Restaurants
                        </Link>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                        <Link className="dropdown-item" to={`/filterNearbyRestaurants/${id}`} style={{ color: "#012970" }}>
                            <svg style={{ verticalAlign: "-4px", marginRight: "8px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#899bbd" class="bi bi-geo-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
                            </svg>
                             Nearby Restaurants
                        </Link>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                        <Link to={`/listReservationsUser/${id}`} className="dropdown-item" style={{ color: "#012970" }}>
                            <svg style={{ verticalAlign: "-4px", marginRight: "8px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#899bbd" className="bi bi-calendar-check" viewBox="0 0 16 16">
                                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                            Your Reservations
                        </Link>
                    </li>
                    <hr style={{ marginBottom: "15px" }} className="dropdown-divider" />
                    <li style={{ marginBottom: "15px" }}>
                        <Link className="dropdown-item" to={`/client/chat/${id}`} style={{ color: "#012970" }}>
                            <svg style={{ verticalAlign: "-4px", marginRight: "8px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#899bbd" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                            </svg>
                            Chats
                        </Link>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                        <Link className="dropdown-item" to={`/updateInfo/${id}`} style={{ color: "#012970" }}>
                            <svg style={{ verticalAlign: "-4px", marginRight: "8px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#899bbd" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                            Edit Profile
                        </Link>
                    </li>
                    {store.client_auth? (
                        <li onClick={logout} className="dropdown-item" style={{ color: "#012970", marginBottom: "15px" }}>
                            <svg style={{ verticalAlign: "-4px", marginRight: "8px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#899bbd" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                            </svg>
                            Log out
                        </li>
                    ) : null}
                </ul>
            </div>
        </>
    );
};

