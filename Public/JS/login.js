const failedLogin = () => {
	const errorMessage = document.getElementById('errors');
	errorMessage.setAttribute('class', 'fail');

	const emailError = document.getElementById('email');
	emailError.setAttribute('class', 'email failInput');

	const passError = document.getElementById('pass');
	passError.setAttribute('class', 'pass failInput');

	const emailTitle = document.getElementById('emailInput');
	emailTitle.setAttribute('class', 'emailInput fail');

	const passTitle = document.getElementById('passInput');
	passTitle.setAttribute('class', 'passInput fail');
};

function login() {
	const email = document.getElementById('email').value;
	const pass = document.getElementById('pass').value;

	axios
		.post('http://localhost:3000/users/login', {
			email,
			password: pass
		})
		.then(function(response) {
			localStorage.setItem('authToken', response.data.authToken);
			if (response.status === 200) {
				window.location = '/Public/main.html';
			}
		})
		.catch(function(error) {
			failedLogin();
		});
}
