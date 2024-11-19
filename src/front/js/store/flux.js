const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            admins: [],
            admin: {},
            admin_auth: false,

            users: [],
            auth: false,
            restaurants: [],
            restaurante: {},
            restaurant_auth: false,

            reservations: [],
            categories: [],
            categories_auth: false,
            category: {},

            ocasiones: [],
            ocasiones_auth: false,
            ocasion: {},

            sessionUserId: null,
            client_auth: false,
            sessionRestaurantId: null,
            sessionAdminId: null,
        },
        actions: {
            // Use getActions to call a function within a function
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            verifyTokenRestaurant: () => {
                const token = localStorage.get_reservationsRestaurant('jwt-token');

                if (token != null) {
                    setStore({ authenticatedBuyer: true });
                    return token;
                }
            },

            loadUsers: () => {
                fetch(process.env.BACKEND_URL + '/api/clients')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        setStore({ users: data });
                    })
                    .catch(error => console.error("Error loading users:", error));
            },

            addUser: (name, last_name, identification_number, email, phone_number, password) => {
                return fetch(process.env.BACKEND_URL + '/api/signup/client', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "name": name,
                        "last_name": last_name,
                        "identification_number": identification_number,
                        "email": email,
                        "phone_number": phone_number,
                        "password": password
                    }),
                    redirect: "follow",
                })
                .then((response) => {
                    console.log("HTTP Status:", response.status);

                    if (!response.ok) {
                        // Lanza un error si el código HTTP no es exitoso
                        return response.json().then((error) => {
                            throw new Error(error.msg || "Error desconocido");
                        });
                    }

                    return response.json();
                })
                .then((data) => {
                    if (data.access_token) {
                        localStorage.setItem("token", data.access_token);
                        console.log("Token de acceso:", data.access_token);
                        getActions().loadSomeData(); // Opcional: Carga de datos adicionales
                    }

                    if (data.client) {
                        console.log("Detalles del cliente:", data.client);
                        setStore({ client_auth: true }); // Autenticación habilitada
                        return data.client;
                    }

                    throw new Error("Respuesta inesperada del servidor");
                })
                .catch((error) => {
                    console.error("Error al crear el cliente:", error.message || error);
                    return null; // Retorna null para manejar el error en el frontend
                });
            },

            // Delete a user by index
            deleteUser: (index) => {
                const store = getStore();
                const idToDelete = store.users[index].id;
                console.log("Deleting user with id:", idToDelete);

                // Update store before sending DELETE request
                setStore({ users: store.users.filter((user, i) => i !== index) });

                fetch(`${process.env.BACKEND_URL}/api/client/${idToDelete}`, { method: 'DELETE' })
                    .then(() => console.log(`User ${idToDelete} deleted`))
                    .catch(error => console.error("Error deleting user:", error));
            },

            // Update user by id
            updateUser: (userModif, id) => {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userModif)
                };
                fetch(`${process.env.BACKEND_URL}/api/client/${id}`, requestOptions)
                    .then(response => response.json())
                    .then(data => console.log("User updated:", data))
                    .catch(error => console.error("Error updating user:", error));
            },

            loginClient: async (email, password) => {
                try {
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        })
                    };

                    const response = await fetch(`${process.env.BACKEND_URL}/api/loginClient`, requestOptions);
                    
                    if (response.status === 200) {
                        const data = await response.json();
                        localStorage.setItem("token", data.access_token);
                        setStore({ auth: true, client_auth: true, sessionUserId: data.user_id });
                        console.log(data);  
                        return true;  
                    } else {
                        throw new Error("Login fallido");
                    }

                } catch (error) {
                    console.error("Error en login:", error);
                    return false;  
                }
            },

            logoutClient: () => {
                localStorage.removeItem("token")
                setStore({ client_auth: false });
            },

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error", error);
                }
            },

            loadSomeData: () => {
                console.log("Se cargó la página");
                fetch(process.env.BACKEND_URL + "/api/restaurants")
                    .then((response) => response.json())
                    .then((data) => {
                        setStore({ restaurants: data });
                    })
                    .catch((error) => console.error("Error al cargar los restaurantes:", error));
            },

            removeRestaurant: (idToDelete) => {
                fetch(`${process.env.BACKEND_URL}/api/restaurant/${idToDelete}`, {
                    method: "DELETE",
                    redirect: "follow",
                })
                    .then((response) => response.text())
                    .then(() => getActions().loadSomeData());
            },
            addNewRestaurant: (email, guests_capacity, location, name, phone_number, password, image, latitude, longitude) => {
                return fetch(`${process.env.BACKEND_URL}/api/signup/restaurant`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "email": email,
                        "guests_capacity": guests_capacity,
                        "location": location,
                        "name": name,
                        "phone_number": phone_number,
                        "password": password,
                        "image_url": image,
                        "latitude": latitude,
                        "longitude": longitude
                    }),
                    redirect: "follow",
                })
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 201) { 
                        setStore({ restaurant_auth: true });
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.access_token) {
                        localStorage.setItem("token", data.access_token);
                        console.log("Token de acceso:", data.access_token);
                        getActions().loadSomeData();
                    }

                    if (data.restaurant) {
                        console.log("Detalles del restaurante:", data.restaurant);
                        return data.restaurant;
                    }
                })
                .catch((error) => {
                    console.error("Error al crear el restaurante:", error);
                    return null; // Devolvemos null en caso de error para manejarlo en el frontend
                });
            },

            traer_restaurante: (id) => {
                return fetch(`${process.env.BACKEND_URL}/api/restaurant/${id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setStore({ restaurante: data });
                        return data; 
                    });
            },

            loginrestaurant: async (inputEmail, inputPassword) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/login/restaurant`, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ "email": inputEmail, "password": inputPassword }),
                        redirect: "follow"
                    });

                    if (response.status === 200) {
                        const data = await response.json();
                        localStorage.setItem("token", data.access_token);
                        setStore({ restaurant_auth: true, auth: true, sessionRestaurantId: data.restaurant_id });
                        return data;  // devolvemos data para usarla en el componente
                    } else {
                        console.error("Error en la autenticación: ", response.status);
                        return null;
                    }
                } catch (error) {
                    console.error("Error en loginrestaurant:", error);
                    return null;
                }
            },

            logoutrestaurant: () => {
                console.log("logout");
                localStorage.removeItem("token");
                console.log(localStorage);
                setStore({ auth: false });
            },
        }
    };
};

export default getState;
