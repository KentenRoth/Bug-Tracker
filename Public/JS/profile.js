const token = localStorage.getItem('authToken');

const config = {
	headers: {
		Authorization: 'Bearer ' + token
	}
};

logoutAllAccounts = () => {
	axios
		.post('http://localhost:3000/users/logoutAll', config)
		.then(response => {
			if (response.status === 200) {
				window.location = '/Public/index.html';
			}
		})
		.catch(error => {
			console.log(error);
		});
};

gettingProfileInformation = () => {
	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	axios
		.get('http://localhost:3000/users/me', config)
		.then(response => {
			nameInput.setAttribute('value', response.data.name);
			emailInput.setAttribute('value', response.data.email);
		})
		.catch(error => console.log(error));
};

gettingProfileInformation();
