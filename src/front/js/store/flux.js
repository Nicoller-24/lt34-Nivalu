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
			admin_auth : false,

		
			users:[],
			auth: false,
			restaurants: [

			],
			restaurante: {},
			restaurant_auth : false,

			reservations: [],
			categories: [],
			categories_auth :false,

			ocasiones: [],
			ocasiones_auth :false,

			sessionUserId: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
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

			// Add a user
			addUser: (newUserData) => {
				console.log("adduser")
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						...newUserData,
						id: newUserData.identification_number
					  })
				};
				fetch(process.env.BACKEND_URL + '/api/signup/client', requestOptions)
					.then(response => response.json())
					.then(data => console.log("User added:", data))
					.catch(error => console.error("Error adding user:", error));
			},

			// Delete a user by index
			deleteUser: (index) => {
				const store = getStore();
				const idToDelete = store.users[index].id;
				console.log("Deleting user with id:", idToDelete);

				// Update store before sending DELETE request
				setStore({ users: store.users.filter((user, i) => i !== index) });

				fetch(process.env.BACKEND_URL +`/api/client/${idToDelete}`, { method: 'DELETE' })
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
				fetch(process.env.BACKEND_URL + `/api/client/${id}`, requestOptions)
					.then(response => response.json())
					.then(data => console.log("User updated:", data))
					.catch(error => console.error("Error updating user:", error));
			},

			loginClient: (email, password) => {
					
				const resquestOptions = {
					method: 'POST',
					headers: {'content-Type' : 'application/json'},
					body: JSON.stringify({
						"email": email,
						"password" : password
					})
				};
				return fetch(`${process.env.BACKEND_URL}/api/loginClient`, resquestOptions)
					.then(response => {
						console.log (response.status)
						if (response.status == 200){
							setStore( {auth : true});
							return response.json();
						} else {
						throw new Error("Login fallido");
						}
					
					
					})
					.then(data => {
						localStorage.setItem("token",data.access_token);
						// Almacena client_id y restaurant_id en el store
						setStore({ auth: true, sessionUserId: data.user_id});

						console.log(data)
						return true; 
					})

					.catch(error => {
						console.error("Error en login:", error);
						return false;  // Fallo
					});
			},

			logoutClient: () => {
				localStorage.removeItem("token")
				setStore( {auth : false});
			},
			


			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error", error)
				}
			},

			loadSomeData: () => {
				console.log("Se cargó la página");
				fetch(process.env.BACKEND_URL + "/api/restaurants")
					.then((response) => response.json())
					.then((data) => {
						setStore({ restaurants: data })
					})
					.catch((error) => console.error("Error al cargar los restaurantes:", error));
			},

			removeRestaurant: (idToDelete) => {
				fetch(process.env.BACKEND_URL + "/api/restaurant/" + idToDelete, {
					method: "DELETE",
					redirect: "follow",
				})
					.then((response) => response.text())
					.then(() => getActions().loadSomeData());
			},

			addNewRestaurant:(email, guests_capacity, location, name, phone_number, password, image, latitude, longitude) => {
				fetch(process.env.BACKEND_URL + '/api/signup/restaurant', {
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
					console.log(response.status)
					if (response.status == 200) {
						setStore({ restaurant_auth: true })
					}
					return response.json()
				})
			},

			traer_restaurante: (id) => {
				return fetch(process.env.BACKEND_URL + "/api/restaurant/" + id)
					.then((response) => response.json())
					.then((data) => {
						setStore({ restaurante: data });
						return data; 
					});
			}
			,
			loginrestaurant: (inputEmail, inputPassword) => {
				fetch(process.env.BACKEND_URL + "/api/login/restaurant", {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": inputEmail,
						"password": inputPassword
					}),
					redirect: "follow"
				})
					.then((response) => {
						console.log(response.status)
						if (response.status == 200) {
							setStore({ restaurant_auth: true })
						}
						return response.json()
					})
					.then((data) => {
						localStorage.setItem("token", data.access_token);
						console.log(data.access_token)
						console.log(data)
					})
			},
			logoutrestaurant: () => {
				console.log("logout")
				localStorage.removeItem("token");
				setStore({ auth: false })
			},

			adminlogin: (inputEmail, inputPassword) => {
				fetch(process.env.BACKEND_URL + "/api/login/admins", {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ "email": inputEmail, "password": inputPassword }),
					redirect: "follow"
				})
				.then((response) => {
					if (response.status === 200) {
						setStore({ admin_auth: true });
					}
					return response.json();
				})
				.then((data) => {
					if (data.access_token) { // Ensure token is present
						localStorage.setItem("token", data.access_token);
						console.log("Token stored:", data.access_token);
					} else {
						console.error("Login failed, no token received");
					}
				})
				.catch((error) => {
					console.error("Error in admin login:", error);
				});
			},

			adminlogout: () => {
				console.log("logout")
				localStorage.removeItem("token");
				setStore({ auth: false })
			},


			loadSomeDataAdmin: () => {
				console.log("Se cargó la página");
				fetch(process.env.BACKEND_URL + "/api/admins")
					.then((response) => response.json())
					.then((data) => {
						setStore({ admins: data })
					})
					.catch((error) => console.error("Error al cargar los usuarios de admin:", error));
			},
			removeAdmin: (idToDelete) => {
				fetch(process.env.BACKEND_URL + "/api/admins/" + idToDelete, {
					method: "DELETE",
					redirect: "follow",
				})
					.then((response) => response.text())
					.then(() => getActions().loadSomeDataAdmin());
			},
			addNewAdmin:(email, name, user_name, password) => {
				fetch(process.env.BACKEND_URL + '/api/signup/admins', {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"name": name,
						"user_name": user_name,
						"password": password,
					}),
					redirect: "follow",
				})
					.then((response) => response.text())
					.then(() => getActions().loadSomeDataAdmin());
			},
			
			editAdmin: (adminModif, id) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(adminModif)
				};
				fetch(process.env.BACKEND_URL + `/api/edit/admins/${id}`, requestOptions)
					.then(response => response.json())
					.then(data => console.log("Admin updated:", data))
					.catch(error => console.error("Error updating admin:", error));
			},

			traer_admin: (id) => {
				fetch(process.env.BACKEND_URL + "/api/admins/" + id)
					.then((response) => response.json())
					.then((data) => setStore({admin: data}))
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			addReservation: (newReservationData) => {
				const store = getStore();
				console.log(newReservationData)

				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						...newReservationData,
						
						
					  })
				};
				fetch(process.env.BACKEND_URL + '/api/reservations', requestOptions)
					.then(response => response.json())
					.then(data => console.log("Reservation added:", data))
					.catch(error => console.error("Error adding reservation:", error));

			},

			deleteReservation: (reservationId) => {
				const store = getStore();
				const updatedReservations = store.reservations.filter(reservation => reservation.id !== reservationId);
				console.log("Deleting reservation with id:", reservationId);

				// Update store before sending DELETE request
				setStore({ reservations: updatedReservations });

				fetch(process.env.BACKEND_URL +`/api/reservations/${reservationId}`, { method: 'DELETE' })
					.then(() => console.log(`Reservation ${reservationId} deleted`))
					.catch(error => console.error("Error deleting reservation:", error));
			},

			loadSomeDataCategory: () => {
				console.log("Se cargó la página");
				fetch(process.env.BACKEND_URL + "/api/categories")
					.then((response) => response.json())
					.then((data) => {
						setStore({ categories: data })
					})
					.catch((error) => console.error("Error al cargar categorias:", error));
			},

			addNewCategory: (name) => {
				const token = localStorage.getItem('token'); // Match with 'setItem' key

   				 if (!token) { 
       			 console.error('JWT token is missing. User might not be authenticated.');
        		return; }
			
				name = name.trim(); // Trim any whitespace from the category name
			
				if (!name) {
					console.error('Category name is required'); // Log error if the name is empty
					return; // Exit if the name is invalid
				}
			
				console.log("Sending category name:", name); // Log the name being sent
				console.log("Using JWT token:", token); // Log the token being used
			
				fetch(process.env.BACKEND_URL + '/api/create/categories', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json", // Specify the content type
						"Authorization": `Bearer ${token}` // Include the JWT token for authentication
					},
					body: JSON.stringify({ "name": name }), // Send the category name in the body
				})
				.then((response) => {
					if (!response.ok) {
						return response.json().then(err => {
							throw new Error(err.message || 'Failed to create category'); // Throw an error with the message from the server
						});
					}
					return response.json(); // Parse the response as JSON
				})
				.then((data) => {
					console.log('Category created:', data); // Log success response
					getActions().loadSomeDataCategory(); // Load updated categories
				})
				.catch((error) => {
					console.error('Error creating category:', error); // Log any errors that occur
				});
			},
			
			editCategory: (categoryModif, id) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(categoryModif)
				};
				fetch(process.env.BACKEND_URL + `/api/edit/categories/${id}`, requestOptions)
					.then(response => response.json())
					.then(data => console.log("Category updated:", data))
					.catch(error => console.error("Error updating category:", error));
			},

			removeCategory: (idToDelete) => {
				fetch(process.env.BACKEND_URL + "/api/categories/" + idToDelete, {
					method: "DELETE",
					redirect: "follow",
				})
					.then((response) => response.text())
					.then(() => getActions().loadSomeDataCategory());
			},

			loadSomeDataOcasion: () => {
				console.log("Se cargó la página");
				fetch(process.env.BACKEND_URL + "/api/ocasiones")
					.then((response) => response.json())
					.then((data) => {
						setStore({ ocasiones: data })
					})
					.catch((error) => console.error("Error al cargar ocasiones:", error));
			},

			// addNewOcasion:(name,) => {
			// 	fetch(process.env.BACKEND_URL + '/api/create/ocasiones', {
			// 		method: 'POST',
			// 		headers: { "Content-Type": "application/json" },
			// 		body: JSON.stringify({
			// 			"name": name,

			// 		}),
			// 		redirect: "follow",
			// 	})
			// 		.then((response) => response.text())
			// 		.then(() => getActions().loadSomeDataOcasion());
			// },

			addNewOcasion: (name) => {
				const token = localStorage.getItem('token'); // Match with 'setItem' key

   				 if (!token) { 
       			 console.error('JWT token is missing. User might not be authenticated.');
        		return; }
			
				name = name.trim(); // Trim any whitespace from the category name
			
				if (!name) {
					console.error('Ocasion name is required'); // Log error if the name is empty
					return; // Exit if the name is invalid
				}
			
				console.log("Sending ocasion name:", name); // Log the name being sent
				console.log("Using JWT token:", token); // Log the token being used
			
				fetch(process.env.BACKEND_URL + '/api/create/ocasiones', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json", // Specify the content type
						"Authorization": `Bearer ${token}` // Include the JWT token for authentication
					},
					body: JSON.stringify({ "name": name }), // Send the category name in the body
				})
				.then((response) => {
					if (!response.ok) {
						return response.json().then(err => {
							throw new Error(err.message || 'Failed to create ocasion'); // Throw an error with the message from the server
						});
					}
					return response.json(); // Parse the response as JSON
				})
				.then((data) => {
					console.log('Ocasion created:', data); // Log success response
					getActions().loadSomeDataOcasion(); // Load updated categories
				})
				.catch((error) => {
					console.error('Error creating ocasion:', error); // Log any errors that occur
				});
			},

			editOcasion: (ocasionModif, id) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(ocasionModif)
				};
				fetch(process.env.BACKEND_URL + `/api/edit/ocasiones/${id}`, requestOptions)
					.then(response => response.json())
					.then(data => console.log("Ocasion updated:", data))
					.catch(error => console.error("Error updating ocasion:", error));
			},

			removeOcasion: (idToDelete) => {
				fetch(process.env.BACKEND_URL + "/api/ocasiones/" + idToDelete, {
					method: "DELETE",
					redirect: "follow",
				})
					.then((response) => response.text())
					.then(() => getActions().loadSomeDataOcasion());
			},
		}

		
	};

};


export default getState;
