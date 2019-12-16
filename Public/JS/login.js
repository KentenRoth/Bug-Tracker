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
			console.log(response);
			if (response.status === 200) {
				window.location = '/Public/main.html';
			}
		})
		.catch(function(error) {
			console.log(error);
		});
}
