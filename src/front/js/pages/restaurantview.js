import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { NavbarRestaurant } from "../component/navbarestaurant";


export const Restaurantview = () => {
    const navigate = useNavigate()
	const { store, actions } = useContext(Context);


	return (<>
    
    <NavbarRestaurant/>
    
    </>

	);
};

