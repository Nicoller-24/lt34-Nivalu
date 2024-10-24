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
       <h1>{store.restaurante.name}</h1>
	   	<Link to={"/restaurants"}>
			O deseas volver
		</Link>
    </>        
    );
};