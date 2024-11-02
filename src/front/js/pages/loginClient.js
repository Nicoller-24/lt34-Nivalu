import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const LoginClient = () => {

    const[email, setEmail] = useState ('')
    const[password, setPassword] = useState ('')
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();



    function sendData(e){
        e.preventDefault() 

        actions.loginClient(email, password).then(success => {
            if (success) {
                navigate("/");
            } else {
                alert("Inicio de sesión fallido");
            }
        });
        
    }
    return(
        
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
            <div className="mb-3">
                <h1>Login Clients</h1>
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <Link to="/">
                    {/* agregar pagina de admin select */}
						<button
							style={{
								backgroundColor: "#008CBA",
								color: "white",
								border: "none",
								borderRadius: "10px",
								padding: "10px 20px",
								fontSize: "16px",
								cursor: "pointer",
								transition: "background-color 0.3s ease",
								marginLeft: "5%",
							}}
							onMouseOver={(e) =>
								(e.target.style.backgroundColor = "#007bb5")
							}
							onMouseOut={(e) =>
								(e.target.style.backgroundColor = "#008CBA")
							}
						>
							Volver
						</button>
					</Link>
            </form>
        </div>
    )

}
