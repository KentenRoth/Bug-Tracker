createAccount = () => {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const pass = document.getElementById('pass1').value;

	axios
		.post('http://localhost:3000/users', {
			name,
			email,
			password: pass
		})
		.then(response => {
			localStorage.setItem('authToken', response.data.authToken);
			if (response.status === 201) {
				window.location = '/Public/main.html';
			}
		})
		.catch(error => {
			console.log(error);
		});
};

console.log('connected');
