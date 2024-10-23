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

			restaurants: [

			],
			restaurante: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
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
					console.log("Error loading message from backend", error)
				}
			},
			loadSomeData: () => {
				console.log("Se cargó la página");
				fetch(process.env.BACKEND_URL + "api/restaurants")
					.then((response) => response.json())
					.then((data) => {
						setStore({ restaurants: data })
					})
					.catch((error) => console.error("Error al cargar los restaurantes:", error));
			},
			removeRestaurant: (idToDelete) => {
				fetch(process.env.BACKEND_URL + "api/restaurant/" + idToDelete, {
					method: "DELETE",
					redirect: "follow",
				})
					.then((response) => response.text())
					.then(() => getActions().loadSomeData());
			},
			addNewRestaurant:(email, guests_capacity, location, name, phone_number, password) => {
				fetch(process.env.BACKEND_URL + 'api/signup/restaurant', {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"guests_capacity": guests_capacity,
						"location": location,
						"name": name,
						"phone_number": phone_number,
						"password": password,
					}),
					redirect: "follow",
				})
					.then((response) => response.text())
					.then(() => getActions().loadSomeData());
			},
			putRestaurant(email, guests_capacity, location, name, phone_number, password, id) {
				fetch(process.env.BACKEND_URL + "api/restaurant/" + id, {
					method: 'PUT',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: email || restaurantData?.email,
						guests_capacity: guests_capacity || restaurantData?.guests_capacity,
						location: location || restaurantData?.location,
						name: name || restaurantData?.name,
						phone_number: phone_number || restaurantData?.phone_number,
						//password: password || restaurantData?.password
					}),
					redirect: "follow"
				})
				.then((response) => response.text());
			},
			traer_restaurante: (id) => {
				fetch(process.env.BACKEND_URL + "api/restaurant/" + id)
					.then((response) => response.json())
					.then((data) => setStore({restaurante: data}))
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
			}
		}
	};
};

export default getState;
