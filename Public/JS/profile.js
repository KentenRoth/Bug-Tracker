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
let userEmail = '';

gettingProfileInformation = () => {
	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	axios
		.get('http://localhost:3000/users/me', config)
		.then(response => {
			nameInput.setAttribute('value', response.data.name);
			emailInput.setAttribute('value', response.data.email);
			userEmail = response.data.email;
		})
		.catch(error => console.log(error));
};

saveEditsToProfile = () => {
	const password = document.getElementById('pass1').value;
	if (password.length === 0) {
		changesToProfileNotPassword();
	} else {
		passwordUpdate();
	}
};

changesToProfileNotPassword = () => {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	axios
		.post('http://localhost:3000/users/login', {
			email: userEmail,
			password: currentPass
		})
		.then(response => {
			if (response.status === 200) {
				console.log('running');
				axios.patch(
					'http://localhost:3000/users/me',
					{
						name,
						email,
						password
					},
					config
				);
			}
		})
		.catch(error => {
			console.log(error);
		});
};

passwordUpdate = () => {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('pass1').value;
	const currentPass = document.getElementById('currentPass').value;
	if (password.length === 0) {
		password = currentPass;
	}

	axios
		.post('http://localhost:3000/users/login', {
			email: userEmail,
			password: currentPass
		})
		.then(response => {
			if (response.status === 200) {
				axios.patch(
					'http://localhost:3000/users/me',
					{
						name,
						email,
						password
					},
					config
				);
			}
		})
		.then(response => {
			loginAfterPassChange();
		})
		.catch(error => {
			console.log(error);
		});
};

loginAfterPassChange = () => {
	const email = document.getElementById('email').value;
	const password = document.getElementById('currentPass').value;

	console.log(email);
	console.log(password);

	axios
		.post('http://localhost:3000/users/login', {
			email,
			password
		})
		.then(response => {
			localStorage.setItem('authToken', response.data.authToken);
			if (response.status === 200) {
				window.location = '/Public/main.html';
			}
		});
};

gettingProfileInformation();
