console.log('connected');

const token = localStorage.getItem('authToken');
const config = {
	headers: {
		Authorization: 'Bearer ' + token
	}
};

saveTicket = () => {
	const project = document.getElementById('project').value;
	const summary = document.getElementById('subject').value;
	const priority = document.getElementById('priority').value;
	const description = document.getElementById('description').value;
	axios
		.post(
			'http://localhost:3000/tickets',
			{
				project,
				summary,
				priority,
				description
			},
			config
		)
		.then(response => {
			if (response.status === 200) {
				window.location = '/Public/main.html';
			}
		});
};
