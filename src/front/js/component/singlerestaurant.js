import React from "react";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { Router } from "react-router-dom";



export const Singlerestaurant = () => {
   
	const { store, actions } = useContext(Context);

    const params = useParams();
    console.log(params)
	const [restaurantData, setRestaurantData] = useState ([])
	function traer_restaurante () {
		fetch("https://cuddly-waffle-5g9r4r6qrjxf7p45-3001.app.github.dev/api/restaurant/" + params.id)
			.then((response) => response.json())
			.then((data) => setRestaurantData(data))
	}

    useEffect(()=> 
		traer_restaurante()
		
		,[])

    return (<>
       <h1>{restaurantData.name}</h1>
    </>

        
    );
};