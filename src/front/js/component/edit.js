import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const Edit = () => {
    const [adminData, setAdminData] = useState(null);
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputUserName, setInputUserName] = useState("");

    const { store, actions } = useContext(Context);
    const params = useParams();

    function traer_admin() {
        fetch(process.env.BACKEND_URL+ `api/admins/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setAdminData(data);
                setInputName(data.name || "");
                setInputEmail(data.email || "");
                setInputUserName(data.user_name || "");
            });
    }

    useEffect(() => {
        traer_admin();
    }, [params.id]);



    const handleSubmit = (e) => {
        e.preventDefault();
        actions.putAdmin(inputEmail, inputName, inputUserName, params.id, inputPassword);
    };

    return (
        <div className="container" style={{ backgroundColor: "white", width: "70%", paddingBottom: "10%" }}>
            <h1 style={{ marginLeft: "30%" }}>Edit Admin</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="Email"
                        placeholder="Email"
                        onChange={(e) => setInputEmail(e.target.value)}
                        value={inputEmail}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="user_name" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="guestscapacity"
                        placeholder="Username"
                        onChange={(e) => setInputUserName(e.target.value)}
                        value={inputUserName}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        onChange={(e) => setInputName(e.target.value)}
                        value={inputName}
                    />
                </div>

                
                <Link to={"/admins"}>
                    <button
                        style={{"marginRight": "10px"}}
                        type="submit"
                        className="btn btn-primary w-100 mb-4"
                    >
                        Save
                    </button>
                </Link>
                <Link to={"/admins"}>
                    O deseas volver
                </Link>
            </form>
        </div>
    );
};