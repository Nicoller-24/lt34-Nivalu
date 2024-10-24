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
			admins: []
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
				fetch(process.env.BACKEND_URL + "/api/admins")
					.then((response) => response.json())
					.then((data) => {
						setStore({ admins: data })
					})
					.catch((error) => console.error("Error al cargar los usuarios de admin:", error));
			},
			removeAdmin: (idToDelete) => {
				fetch(process.env.BACKEND_URL + "api/admins/" + idToDelete, {
					method: "DELETE",
					redirect: "follow",
				})
					.then((response) => response.text())
					.then(() => getActions().loadSomeData());
			},
			addNewAdmin:(email, name, user_name, password) => {
				fetch(process.env.BACKEND_URL + 'api/signup/admins', {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"name": name,
						"username": user_name,
						"password": password,
					}),
					redirect: "follow",
				})
					.then((response) => response.text())
					.then(() => getActions().loadSomeData());
			},
			putAdmin(email, name, user_name, id) {
				fetch(process.env.BACKEND_URL + "/api/admins/" + id, {
					method: 'PUT',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: email || adminsData?.email,
						user_name: user_name || adminsData?.user_name,
						name: name || adminsData?.name,
						//password: password || adminsData?.password
					}),
					redirect: "follow"
				})
				.then((response) => response.text());
			},
			traer_admin: (id) => {
				fetch(process.env.BACKEND_URL + "/api/admins/" + id)
					.then((response) => response.json())
					.then((data) => setStore({admins: data}))
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
