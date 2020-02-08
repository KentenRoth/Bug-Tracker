let errors = [];

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
	const pass2 = document.getElementById('pass2').value;
	if (pass1 !== pass2) {
		errors.push('passError');
	}
	if (pass1.length === 0) {
		errors.push('passError');
	}
	const noError = document.getElementById('passError');
	noError.setAttribute('class', 'pasError noError');
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

createAccount = () => {
	errors = [];
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const pass = document.getElementById('pass1').value;
	nameError();
	passwordError();
	emailError();

	if (errors.length === 0) {
		axios
			.post('https://kents-bug-tracker-api.herokuapp.com/users', {
				name,
				email,
				password: pass
			})
			.then(response => {
				localStorage.setItem('authToken', response.data.authToken);
				if (response.status === 201) {
					window.location = '/Public';
				}
			})
			.catch(error => {
				const failedLogin = document.getElementById('emailError');
				failedLogin.setAttribute('class', 'emailError');
			});
	}
	displayErrors();
};
