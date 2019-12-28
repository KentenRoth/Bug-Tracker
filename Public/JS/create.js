const token = localStorage.getItem('authToken');
const config = {
	headers: {
		Authorization: 'Bearer ' + token
	}
};

let errors = [];

projectError = () => {
	const project = document.getElementById('project').value.trim();
	if (project.length > 50 || project.length === 0) {
		errors.push('projectError');
	}
	const noError = document.getElementById('projectError');
	noError.setAttribute('class', 'projectError noError');
};

summaryError = () => {
	const summary = document.getElementById('subject').value.trim();
	if (summary.length > 100 || summary.length === 0) {
		errors.push('summaryError');
	}
	const noError = document.getElementById('summaryError');
	noError.setAttribute('class', 'summaryError noError');
};

priorityError = () => {
	const priority = document
		.getElementById('priority')
		.value.trim()
		.toLowerCase();
	if (priority !== 'high' || priority !== 'medium' || priority !== 'low') {
		errors.push('priorityError');
	}
	const noError = document.getElementById('priorityError');
	noError.setAttribute('class', 'priotiryError noError');
};

descriptionError = () => {
	const description = document.getElementById('description').value.trim();
	if (description.length > 500 || description.length === 0) {
		errors.push('descriptionError');
	}
	const noError = document.getElementById('descriptionError');
	noError.setAttribute('class', 'descriptionError noError');
};

displayErrors = () => {
	errors.map(error => {
		const displayError = document.getElementById(`${error}`);
		displayError.setAttribute('class', `${error}`);
	});
};

saveTicket = () => {
	errors = [];
	const project = document.getElementById('project').value;
	const summary = document.getElementById('subject').value;
	const priority = document.getElementById('priority').value.toLowerCase();
	const description = document.getElementById('description').value;
	projectError();
	summaryError();
	priorityError();
	descriptionError();
	if (errors.length === 0) {
		console.log('running');
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
	} else {
		displayErrors();
	}
};
