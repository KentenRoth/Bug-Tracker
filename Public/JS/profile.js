const token = localStorage.getItem('authToken');

const config = {
	headers: {
		Authorization: 'Bearer ' + token
	}
};

logoutAllAccounts = () => {
	axios
		.post('http://localhost:3000/users/logoutAll', {}, config)
		.then(response => {
			console.log(response);
			if (response.status === 200) {
				window.location = '/Public';
			}
		})
		.catch(error => {
			console.log(error);
		});
};
let emial = '';

gettingProfileInformation = () => {
	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	axios
		.get('http://localhost:3000/users/me', config)
		.then(response => {
			nameInput.setAttribute('value', response.data.name);
			emailInput.setAttribute('value', response.data.email);
			email = response.data.email;
		})
		.catch(error => console.log(error));
};

gettingProfileInformation();
