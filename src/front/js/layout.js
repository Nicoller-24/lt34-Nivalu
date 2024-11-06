import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { AddClients } from "./pages/addClients.js";
import { UserList } from "./pages/userList.js";
import { EditClient } from "./pages/editClient.js";
import { ListOfRestaurants } from "./pages/listOfRestaurants.js";
import { LoginClient } from "./pages/loginClient.js";
import { AboutRestaurant } from "./pages/aboutRestaurant.js";
import { ListReservationsUser } from "./pages/listReservationsUser.js";

import { Crudrestaurante } from "./component/crudrestaurante";
import { Singlerestaurant } from "./component/singlerestaurant";
import { Crearrestaurante } from "./component/crearrestaurante";
import { Restaurantselect } from "./component/restaurantselect.js";
import { Edit } from "./component/edit";
import { Signuprestaurant } from "./component/signuprestaurant.js";
import { Mapautocompletate } from "./component/mapautocompletate.js";
import App from "./component/App.js";
import Chat from "./component/chat.js";
import Chatrestaurant from "./component/chatrestaurant.js";

import { Crudadmin } from "./component/crudadmin";
import { Crearadmin } from "./component/crearadmin";
import { EditAdmin } from "./component/editadmin";
import { Oneadmin } from "./component/oneadmin";
import { Adminlogin } from "./component/adminlogin";
import { Adminhomepage } from "./component/adminhomepage";

import { Crearcategoria } from "./component/crearcategoria";
import { Crudcategoria } from "./component/crudcategoria";
import { EditCategory } from "./component/editcategory";

import { Crearocasion } from "./component/crearocasion";
import { Crudocasion } from "./component/crudocasion";
import { EditOcasion } from "./component/editocasion";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Crudadmin />} path="/admins" />
                        <Route element={<Crearadmin />} path="/signup/admins" />
                        <Route element={<Oneadmin />} path="/admins/:id" />
                        <Route element={<EditAdmin />} path="/edit/admins/:id" />
                        
                        <Route element={<AddClients />} path="/adduser" />
                        <Route element={<UserList />} path="/userList" />
                        <Route element={<EditClient />} path="/updateInfo" />
                        <Route element={<Crudrestaurante />} path="/restaurants" />
                        <Route element={<Crearrestaurante />} path="/signup/restaurants" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Singlerestaurant />} path="/restaurant/:id" />
                        <Route element={<Edit />} path="/edit/restaurant/:id" />
                        <Route element={<Restaurantselect />} path="/restauranteselect" />
                        <Route element={<Signuprestaurant />} path="/signuprestaurant" />
                        <Route element={<AboutRestaurant />} path="/aboutRestaurants" />
                        <Route element={<Mapautocompletate />} path="/mapa" />
                        <Route element={<ListReservationsUser />} path="/listReservationsUser" />
                        <Route element={<App/>} path="/openai" />
                        <Route element={<Chat/>} path="/client/chat" />
                        <Route element={<Chatrestaurant/>} path="/restaurant/chat/:id" />

                        <Route element={<Crearcategoria />} path="/create/categories" />
                        <Route element={<Crudcategoria />} path="/categories" />
                        <Route element={<EditCategory />} path="/edit/categories/:id" />
                        <Route element={<Crearocasion />} path="/create/ocasiones" />
                        <Route element={<Crudocasion />} path="/ocasiones" />
                        <Route element={<EditOcasion />} path="/edit/ocasiones/:id" />
                        <Route element={<ListOfRestaurants />} path="/listOfRestaurants" />
                        <Route element={<Adminlogin />} path="/adminlogin/" />
                        <Route element={<Adminhomepage />} path="/adminhomepage/" />
                        <Route element={<LoginClient />} path="/loginClients" />

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
