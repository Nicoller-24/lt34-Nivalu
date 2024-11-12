import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const NavbarRestaurant = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState({});
    const [offcanvasOpen, setOffcanvasOpen] = useState(false);

    const salir = () => {
        actions.logoutrestaurant();
        navigate("/restauranteselect");
        store.restaurant_auth = false;
    };

    const traer_restaurante = () => {
        fetch(`${process.env.BACKEND_URL}/api/restaurant/${props.id}`)
            .then((response) => response.json())
            .then((data) => setRestaurant(data))
            .catch((error) => console.error("Error al cargar el restaurante:", error));
    };

    useEffect(() => {
        traer_restaurante();
    }, []);

    const toggleOffcanvas = () => {
        setOffcanvasOpen(!offcanvasOpen);
        document.body.classList.toggle("offcanvas-open", !offcanvasOpen);
    };

    return (
        <>
            <nav className="navbar shadow-sm" style={{ backgroundColor: "#ffffff", boxShadow: "0px 4px 8px rgba(0, 0, 255, 0.2)" }}>
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
                            <Link className="nav-link" to={`/restaurant/chat/${props.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#050090" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                </svg>
                            </Link>
                        </li>

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
                                    top: "100%", 
                                    right: "0",
                                    zIndex: "1000",
                                    minWidth: "200px", 
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

            {/* Offcanvas side menu styled */}
            <div
                style={{
                    position: "fixed",
                    top: "74px",
                    left: offcanvasOpen ? "0" : "-250px",
                    width: "264px",
                    height: "100%",
                    backgroundColor: "#ffffff",
                    transition: "left 0.3s ease",
                    zIndex: 9,
                    padding: "20px",
                    boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
                    overflowY: "auto"
                }}
            >
                <ul className="list-unstyled">
                    <li><Link className="dropdown-item" to={`/restaurant/${props.id}`}><i className="bi bi-person"></i> Perfil</Link></li>
                    <li><Link className="dropdown-item" to={`/restaurants/${props.id}`}><i className="bi bi-building"></i> Ver Restaurantes</Link></li>
                    <li><Link className="dropdown-item" to="/reservations/requests"><i className="bi bi-calendar-check"></i> Solicitudes de Reserva</Link></li>
                    <li><Link className="dropdown-item" to={"/reservationsRestaurant"}><i className="bi bi-journal-check"></i> Reservaciones</Link></li>
                    <hr className="dropdown-divider" />
                    <li><Link className="dropdown-item" to={"/restaurant/chat/" + props.id}><i className="bi bi-chat-dots"></i> Chats</Link></li>
                    <li><Link className="dropdown-item" to={`/edit/restaurant/${props.id}`}><i className="bi bi-gear"></i> Editar Perfil</Link></li>
                    {store.restaurant_auth ? (
                        <li onClick={() => salir()} className="dropdown-item"><i className="bi bi-box-arrow-right"></i> Log out</li>
                    ) : null}
                </ul>
            </div>

            <style>{`
                .offcanvas-open .page-content {
                    margin-left: 250px;
                    transition: margin-left 0.3s ease;
                }
                .navbar {
                    box-shadow: 0px 4px 8px rgba(0, 0, 255, 0.2);
                }
                .dropdown-item i {
                    margin-right: 8px;
                    color: #050090;
                }
            `}</style>
        </>
    );
};
