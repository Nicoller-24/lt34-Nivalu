import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar bg-primary" data-bs-theme="dark">
            <div className="container">
                NIVALU
                

                {/* Login y Sign Up */}
                <div className="d-flex align-items-center">
                    <Link to="/login">
                        <button className="btn btn-outline-primary mr-3">Login</button>
                    </Link>

                    <div className="dropdown">
						<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Signup
						</button>
						<ul className="dropdown-menu">
							<Link className="dropdown-item" to="/signup-reader">Comensal</Link>
						</ul>
					</div>
                </div>
            </div>
        </nav>
	);
};
