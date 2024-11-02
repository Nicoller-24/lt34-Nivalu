import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
			<Link to="/adminhomepage">
				<button className="btn btn-primary">admins</button>
			</Link>
			<Link to="/restauranteselect">
				<button className="btn btn-primary">restaurantes</button>
			</Link>
			<Link to="/userList">
				<button className="btn btn-primary">comensales</button>
			</Link>
			<Link to="/aboutRestaurants">
				<button className="btn btn-primary">Hacer Reserva</button>
			</Link>
			<Link to="/mapa">
				<button className="btn btn-primary">mapa</button>
			</Link>
			<Link to="/categories">
				<button className="btn btn-primary">categories</button>
			</Link>
			<Link to="/ocasiones">
				<button className="btn btn-primary">ocasiones</button>
			</Link>
		</div>
	);
};
