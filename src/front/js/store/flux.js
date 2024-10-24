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

		
			users:[],
			auth: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},


			loadUsers: () => {
				fetch('https://literate-goggles-x5qrqj4gg6jhvg7w-3001.app.github.dev/api/clients')
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
				fetch('https://literate-goggles-x5qrqj4gg6jhvg7w-3001.app.github.dev/api/signup/client', requestOptions)
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

				fetch(`https://literate-goggles-x5qrqj4gg6jhvg7w-3001.app.github.dev/api/client/${idToDelete}`, { method: 'DELETE' })
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
				fetch(`https://literate-goggles-x5qrqj4gg6jhvg7w-3001.app.github.dev/api/client/${id}`, requestOptions)
					.then(response => response.json())
					.then(data => console.log("User updated:", data))
					.catch(error => console.error("Error updating user:", error));
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
		}
	};

};


export default getState;
