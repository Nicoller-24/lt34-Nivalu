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
			client_auth: false,
		},		
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			verifyTokenRestaurant: () => {
				const token = localStorage.get_reservationsRestaurant('jwt-token');

				if(token != null){
					setStore({ authenticatedBuyer: true })
					return(token)
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

			// Add a user
			
			addUser: ( email, password) => {
				return fetch(process.env.BACKEND_URL + '/api/signup/client', {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						
						
						"email": email,
						
						"password": password
					}),
					redirect: "follow",
				})
				.then((response) => {
					console.log(response.status);
					if (response.status === 201) { 
						setStore({ client_auth: true });
					}
					return response.json();
				})
				.then((data) => {
					if (data.access_token) {
						localStorage.setItem("token", data.access_token);
						console.log("Token de acceso:", data.access_token);
						getActions().loadUsers();
					}
			
					// Si la respuesta contiene el objeto del restaurante, lo devolvemos para su uso
					if (data.client) {

						console.log("Detalles del restaurante:", data.client);
						return data.client;
					}
				})
				.catch((error) => {
					console.error("Error al crear el restaurante:", error);
					return null; // Devolvemos null en caso de error para manejarlo en el frontend
				});
			},
			updateUser: (updateData, id) => {
				return fetch(`${process.env.BACKEND_URL}/api/signup/client/${id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(updateData)
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(`Error en la solicitud: ${response.statusText}`);
						}
						return response.json();
					})
					.then((data) => {
						console.log("User updated successfully:", data);
						return data;
					})
					.catch((error) => {
						console.error("Error updating user:", error);
						throw error; // Propaga el error para manejarlo en el componente
					});
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
						return response.json();
					})
					.then((data) => {
						console.log("User updated successfully:", data);
						return data;
					})
					.catch((error) => {
						console.error("Error updating user:", error);
						throw error; // Propaga el error para manejarlo en el componente
					});
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
				setStore( {client_auth : false});
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
			// addNewRestaurant: async (email, password) => {
			// 	const response = await fetch(`${process.env.BACKEND_URL}/api/signup/restaurant`, {
			// 		method: "POST",
			// 		headers: { "Content-Type": "application/json" },
			// 		body: JSON.stringify({ email, password }),
			// 	});
			// 	if (response.ok) {
			// 		const data = await response.json();
			// 		return data.restaurant; // Return restaurant details
			// 	}
			// 	return null;
			// },

			addNewRestaurant: (email, password) => {
				return fetch(process.env.BACKEND_URL + '/api/signup/restaurant', {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						// "guests_capacity": guests_capacity,
						// "location": location,
						// "name": name,
						// "phone_number": phone_number,
						"password": password,
						// "image_url": image,
						// "latitude": latitude,
						// "longitude": longitude
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
			
					// Si la respuesta contiene el objeto del restaurante, lo devolvemos para su uso
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
				return fetch(process.env.BACKEND_URL + "/api/restaurant/" + id)
					.then((response) => response.json())
					.then((data) => {
						setStore({ restaurante: data });
						return data; 
					});
			}
			,
			loginrestaurant: async (inputEmail, inputPassword) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login/restaurant", {
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
			}
			,
			logoutrestaurant: () => {
				console.log("logout")
				localStorage.removeItem("token");
				console.log(localStorage)
				setStore({ auth: false })
			},
			adminlogin: async (inputEmail, inputPassword) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login/admins", {
						method: 'POST',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ "email": inputEmail, "password": inputPassword }),
						redirect: "follow"
					});
			
					if (response.status === 200) {
						const data = await response.json();
						localStorage.setItem("token", data.access_token);
						setStore({ admin_auth: true, auth: true, sessionAdminId: data.admin_id }); 
						return data;
					} else {
						console.error("Error en la autenticación del admin: ", response.status);
						return null;
					}
				} catch (error) {
					console.error("Error en adminlogin:", error);
					return null;
				}
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
						console.log("Fetched admins:", data); 
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
			addNewAdmin: (email, name, user_name, password, image) => {
				return fetch(process.env.BACKEND_URL + '/api/signup/admins', {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"name": name,
						"user_name": user_name,
						"password": password,
						"image_url": image
					}),
					redirect: "follow",
				})
				.then((response) => {
					console.log(response.status);
					if (response.status === 201) { 
						setStore({ admin_auth: true });
					}
					return response.json();
				})
				.then((data) => {
					if (data.access_token) {
						localStorage.setItem("token", data.access_token);
						console.log("Token de acceso:", data.access_token);
						getActions().loadSomeDataAdmin();
					}
			
					if (data.admin) {
						console.log("Detalles del administrador:", data.admin);
						return data.admin;
					}
				})
				.catch((error) => {
					console.error("Error al crear el administrador:", error);
					return null; 
				});
			},

			traer_admin: (id) => {
				return fetch(`${process.env.BACKEND_URL}/api/admins/${id}`)
					.then((response) => response.json())
					.then((data) => {
						console.log("Fetched admin data:", data); // Log to confirm `image_url` exists
						setStore({ admin: data });
						return data; // Return fetched data to populate form fields
					})
					.catch(error => console.error("Error fetching admin data:", error));
			},

			editAdmin: (adminModif, id) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(adminModif)
				};
				fetch(`${process.env.BACKEND_URL}/api/edit/admins/${id}`, requestOptions)
					.then(response => response.json())
					.then(data => console.log("Admin updated:", data))
					.catch(error => console.error("Error updating admin:", error));
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
					date: newReservationData.date ? newReservationData.date.toISOString().split('T')[0] : null
					
						
						
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

			acceptReservation: (reservationId) => {
				const store = getStore();
				const updatedReservations = store.reservations.map((reservation) => {
					if (reservation.id === reservationId) {
						return { ...reservation, state: "accepted" };
					}
					return reservation;
				});
			
				// Actualizar el estado en el store antes de enviar la solicitud PUT
				setStore({ reservations: updatedReservations });
			
				fetch(`${process.env.BACKEND_URL}/api/reservations/accept/${reservationId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error("Failed to accept reservation");
						}
						return response.json();
					})
					.then((data) => {
						console.log(`Reservation ${reservationId} accepted successfully`, data);
					})
					.catch((error) => {
						console.error("Error accepting reservation:", error);
					});
			},

			rejectReservation: (reservationId) => {
				const store = getStore();
				const updatedReservations = store.reservations.map((reservation) => {
					if (reservation.id === reservationId) {
						return { ...reservation, state: "rejected" };
					}
					return reservation;
				});
			
				// Actualizar el estado en el store antes de enviar la solicitud PUT
				setStore({ reservations: updatedReservations });
			
				fetch(`${process.env.BACKEND_URL}/api/reservations/reject/${reservationId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error("Failed to reject reservation");
						}
						return response.json();
					})
					.then((data) => {
						console.log(`Reservation ${reservationId} rejected successfully`, data);
					})
					.catch((error) => {
						console.error("Error rejecting reservation:", error);
					});
			},
			
			loadSomeDataCategory: (forceReload = false) => {
				const store = getStore();
				// Fetch if forced or if categories array is empty
				if (forceReload || store.categories.length === 0) {
					console.log("Loading categories...");
					fetch(process.env.BACKEND_URL + "/api/categories")
						.then((response) => response.json())
						.then((data) => {
							setStore({ categories: data });
							console.log("Categories loaded:", data);
						})
						.catch((error) => console.error("Error loading categories:", error));
				}
			},
			

			addNewCategory: (name, imageUrl) => {
				const token = localStorage.getItem('token');
				if (!token) {
					console.error('JWT token is missing. User might not be authenticated.');
					return;
				}
			
				const formData = new FormData();
				formData.append("name", name);
				formData.append("image_url", imageUrl);
			
				fetch(process.env.BACKEND_URL + '/api/create/categories', {
					method: 'POST',
					headers: {
						"Authorization": `Bearer ${token}`,
					},
					body: formData,
				})
					.then((response) => {
						if (!response.ok) {
							return response.json().then(err => {
								throw new Error(err.message || 'Failed to create category');
							});
						}
						return response.json();
					})
					.then((data) => {
						console.log('Category created:', data);
						// Force reload categories
						getActions().loadSomeDataCategory(true);
					})
					.catch((error) => {
						console.error('Error creating category:', error);
					});
			},
			
			editCategory: (categoryModif, id) => {
				const requestOptions = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(categoryModif)
				};
			
				fetch(process.env.BACKEND_URL + `/api/edit/categories/${id}`, requestOptions)
					.then(response => {
						if (!response.ok) {
							return response.json().then(err => {
								throw new Error(err.message || 'Failed to update category');
							});
						}
						return response.json();
					})
					.then(data => {
						console.log("Category updated:", data);
						// Force reload categories
						getActions().loadSomeDataCategory(true);
					})
					.catch(error => console.error("Error updating category:", error));
			},
			
			
			removeCategory: (idToDelete) => {
				fetch(process.env.BACKEND_URL + "/api/categories/" + idToDelete, {
					method: "DELETE",
					redirect: "follow",
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error("Failed to delete category");
						}
						return response.text();
					})
					.then(() => {
						console.log(`Category with id ${idToDelete} deleted`);
						// Force reload categories
						getActions().loadSomeDataCategory(true);
					})
					.catch(error => console.error("Error deleting category:", error));
			},
			
			traer_categoria: (id) => {
				return fetch(`${process.env.BACKEND_URL}/api/categories/${id}`)
					.then((response) => response.json())
					.then((data) => {
						setStore({ category: data });
						return data; // Return fetched data to populate form fields
					})
					.catch(error => console.error("Error fetching category data:", error));
			},

			editCategory: (categoryModif, id) => {
				const requestOptions = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(categoryModif)
				};
			
				fetch(process.env.BACKEND_URL + `/api/edit/categories/${id}`, requestOptions)
					.then(response => {
						if (!response.ok) {
							return response.json().then(err => {
								throw new Error(err.message || 'Failed to update category');
							});
						}
						return response.json();
					})
					.then(data => {
						console.log("Category updated:", data);
						// Force reload categories
						getActions().loadSomeDataCategory(true);
					})
					.catch(error => console.error("Error updating category:", error));
			},
			

			loadSomeDataOcasion: async () => {
				try {
					console.log("Se cargó la página");
					const response = await fetch(process.env.BACKEND_URL + "/api/ocasiones");
					if (!response.ok) throw new Error("Error al cargar ocasiones");
					const data = await response.json();
					setStore({ ocasiones: data });
					console.log("Ocasiones cargadas:", data);
				} catch (error) {
					console.error("Error al cargar ocasiones:", error);
				}
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

			editOcasion: async (ocasionModif, id) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(ocasionModif),
				};
			
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/edit/ocasiones/${id}`, requestOptions);
					if (!response.ok) throw new Error("Failed to update occasion");
					const data = await response.json();
					console.log("Ocasion updated:", data);
			
					// Reload data after updating
					await getActions().loadSomeDataOcasion();
			
					return data; 
				} catch (error) {
					console.error("Error updating occasion:", error);
					return null; // Return false if there's an error
				}
			},
			
			
			removeOcasion: (idToDelete) => {
				fetch(process.env.BACKEND_URL + "/api/ocasiones/" + idToDelete, {
					method: "DELETE",
					redirect: "follow",
				})
					.then((response) => response.text())
					.then(() => getActions().loadSomeDataOcasion());
			},

			traer_ocasion: (id) => {
				return fetch(`${process.env.BACKEND_URL}/api/ocasiones/${id}`)
					.then((response) => response.json())
					.then((data) => {
						setStore({ ocasion: data });
						return data; // Return fetched data to populate form fields
					})
					.catch(error => console.error("Error fetching occasion data:", error));
			},

			editOcasion: (ocasionModif, id) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(ocasionModif)
				};
				fetch(`${process.env.BACKEND_URL}/api/edit/ocasiones/${id}`, requestOptions)
					.then(response => response.json())
					.then(data => console.log("Occasion updated:", data))
					.catch(error => console.error("Error updating occasion:", error));
			},

			setRestaurantCategory: (restaurantId, categoryId) => {
				const token = localStorage.getItem("token");
				fetch(process.env.BACKEND_URL + `/api/restaurant/${restaurantId}/category`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					},
					body: JSON.stringify({ category_id: categoryId })
				})
				.then(response => {
					if (!response.ok) {
						throw new Error("Failed to set restaurant category");
					}
					return response.json();
				})
				.then(data => {
					console.log("Category set successfully:", data);
				})
				.catch(error => {
					console.error("Error setting category:", error);
				});
			},

			saveRestaurant: async (restaurantData, restaurantId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/restaurant/${restaurantId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(restaurantData),
					});
			
					if (!response.ok) {
						throw new Error('Failed to save restaurant');
					}
			
					const updatedRestaurant = await response.json();
			
					// Update the restaurants list in the store
					setStore(prevState => ({
						...prevState,
						restaurants: prevState.restaurants.map(r => 
							r.id === updatedRestaurant.id ? updatedRestaurant : r
						),
					}));
				} catch (error) {
					console.error("Error saving restaurant:", error);
				}
			},
		}
	};

};


export default getState;