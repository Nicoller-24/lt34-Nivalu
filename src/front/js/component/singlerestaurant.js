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

    useEffect(()=> 
		actions.traer_restaurante(params.id)
		
		,[])

    return (<>
      <img
        src={store.restaurante.image_url}
        style={{ width: "400px", height: "400px", objectFit: "cover" }}
      />
      <h1>{store.restaurante.name}</h1>
      <h3>{store.restaurante.location}</h3>
      <h3>{store.restaurante.phone_number}</h3>


	   	<Link to={"/restaurants"}>
			O deseas volver
		</Link>
    </>        
    );
};