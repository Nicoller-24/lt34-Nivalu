import React from "react";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { Router } from "react-router-dom";



export const Oneadmin = () => {
   
	const { store, actions } = useContext(Context);

    const params = useParams();
    console.log(params)

    useEffect(()=> 
		actions.traer_admin(params.id)
		
		,[])

    return (<>
       <h1>{store.admins.name}</h1>
	   	<Link to={"/admins"}>
			O deseas volver
		</Link>
    </>        
    );
};