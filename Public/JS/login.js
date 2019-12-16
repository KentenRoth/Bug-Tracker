function login() {
	const email = document.getElementById('email').value;
	const pass = document.getElementById('pass').value;
	axios
		.post('http://localhost:3000/users/login', {
			email,
			password: pass
		})
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		});
}
