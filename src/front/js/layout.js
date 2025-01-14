import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Context } from "./store/appContext";
import { useContext } from "react";

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
import { SuccessPage } from "./pages/successPage.js";
import { ListReservationsRestaurant } from "./pages/listReservationsRestaurant.js";
import { CompleteProfile } from "./pages/completeProfile.js";


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
import { FilterRestaurantsByLocation } from "./component/filterRestaurantsByLocation.js";
import { Restaurantview } from "./pages/restaurantview.js";

import { Crudadmin } from "./component/crudadmin";
import { Crearadmin } from "./component/crearadmin";
import { EditAdmin } from "./component/editadmin";
import { Oneadmin } from "./component/oneadmin";
import { Adminlogin } from "./component/adminlogin";
import { Adminhomepage } from "./component/adminhomepage";

import { Crearcategoria } from "./component/crearcategoria";
import { Crudcategoria } from "./component/crudcategoria";
import { EditCategory } from "./component/editcategory";
import RestaurantCategorySelector from "./component/setrestaurantcategory";

import { Crearocasion } from "./component/crearocasion";
import { Crudocasion } from "./component/crudocasion";
import { EditOcasion } from "./component/editocasion";
import ClientDetails from "./component/clientprofile.js";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const { store, actions } = useContext(Context);


    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                {/* {store.restaurant_auth  || store.admin_auth ? null  : <Navbar style={{display: "none"}}/>} */}
                

                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Crudadmin />} path="/admins/list/:id" />
                        <Route element={<Crearadmin />} path="/signup/admins" />
                        <Route element={<Oneadmin />} path="/admins/:id" />
                        <Route element={<EditAdmin />} path="/edit/admins/:id" />
                        
                        <Route element={<AddClients />} path="/adduser" />
                        <Route element={<UserList />} path="/userList" />
                        <Route element={<EditClient />} path="/updateInfo/:id" />
                        <Route element={<Crudrestaurante />} path="/restaurants/:id" />
                        <Route element={<Crearrestaurante />} path="/signup/restaurants" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Singlerestaurant />} path="/restaurant/:id" />
                        <Route element={<Edit />} path="/edit/restaurant/:id" />
                        <Route element={<Restaurantselect />} path="/restauranteselect" />
                        <Route element={<Signuprestaurant />} path="/loginrestaurant" />
                        <Route element={<AboutRestaurant />} path="/aboutRestaurants/:id" />
                        <Route element={<Mapautocompletate />} path="/mapa" />
                        <Route element={<ListReservationsUser />} path="/listReservationsUser/:id" />
                        <Route element={<App/>} path="/openai" />
                        <Route element={<Chat/>} path="/client/chat/:idclient" />
                        <Route element={<Chatrestaurant/>} path="/restaurant/chat/:id" />
                        <Route element={<Restaurantview/>} path="/restaurant/view" />
                       


                        <Route element={<Crearcategoria />} path="/create/categories/:id" />
                        <Route element={<Crudcategoria />} path="/categories/:id" />
                        <Route element={<EditCategory />} path="/edit/categories/:id/:id_admin" />
                        <Route path="/restaurant/:restaurant_id/category" element={<RestaurantCategorySelector />} />
                        <Route element={<Crearocasion />} path="/create/ocasiones/:id" />
                        <Route element={<Crudocasion />} path="/ocasiones/:id" />
                        <Route element={<EditOcasion />} path="/edit/ocasiones/:id/:id_admin" />
                        <Route element={<ListOfRestaurants />} path="/listOfRestaurants/:id" />
                        <Route element={<Adminlogin />} path="/adminlogin/" />
                        <Route element={<Adminhomepage />} path="/adminhomepage/" />
                        <Route element={<LoginClient />} path="/loginClients" />
                        <Route element={<SuccessPage />} path="/reservaExitosa/:id"/>                      
                        <Route element={<FilterRestaurantsByLocation />} path="/filterNearbyRestaurants/:id"/>


                        <Route element={<ListReservationsRestaurant />} path="/reservationsRestaurant/:id"/>
                        <Route element={<ClientDetails />} path="/clientdetails/:id"/>




                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                   
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);