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
let errors = [];

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
	errors = [];
	const password = document.getElementById('pass1').value;
	nameError();
	passwordError();
	emailError();
	console.log(errors);
	if (errors.length === 0) {
		if (password.length === 0) {
			changesToProfileNotPassword();
		} else {
			passwordUpdate();
		}
	} else {
		displayErrors();
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

nameError = () => {
	const name = document.getElementById('name').value.trim();
	if (name.length > 50 || name.length === 0) {
		errors.push('nameError');
	}
	const noError = document.getElementById('nameError');
	noError.setAttribute('class', 'nameError noError');
};

passwordError = () => {
	const pass1 = document.getElementById('pass1').value;
	const pass1Input = document.getElementById('pass1');
	const pass2 = document.getElementById('pass2').value;
	if (pass1 !== pass2) {
		errors.push('passError');
	}
	if (pass1.length === 0) {
		errors.push('passError');
	}
	const noError = document.getElementById('passError');
	noError.setAttribute('class', 'passError noError');
};

emailError = () => {
	let email = new RegExp(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
	const isEmailValid = email.test(document.getElementById('email').value);
	if (isEmailValid === false) {
		errors.push('emailError');
	}
	const noError = document.getElementById('emailError');
	noError.setAttribute('class', 'emailError noError');
};

displayErrors = () => {
	errors.map(error => {
		const displayError = document.getElementById(`${error}`);
		displayError.setAttribute('class', `${error}`);
	});
};

gettingProfileInformation();
