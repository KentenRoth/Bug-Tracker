const token = localStorage.getItem('authToken');
const ticket = JSON.parse(localStorage.getItem('ticket'));
let errors = [];

const config = {
	headers: {
		Authorization: 'Bearer ' + token
	}
};

setButtons = () => {
	const id = ticket._id;
	const complete = document.getElementById('complete');
	const remove = document.getElementById('remove');
	complete.setAttribute('onClick', "completedTicket('" + id + "')");
	remove.setAttribute('onclick', "removeTicket('" + id + "')");

	if (ticket.completed === false) {
		complete.innerHTML = 'Complete';
	} else {
		complete.innerHTML = 'Un-Complete';
	}
};

fillDataIntoInputs = () => {
	const ticket = JSON.parse(localStorage.getItem('ticket'));
	if (ticket === null) {
		const noTicketError = document.getElementById('noTicketError');
		noTicketError.setAttribute('class', 'noTicketError');
		complete.innerHTML = 'No Ticket';
		document.getElementById('description').value = '';
		return console.log(
			'Could not find ticket please select another ticket from your list.'
		);
	}

	const project = document.getElementById('project');
	const summary = document.getElementById('subject');
	const priority = document.getElementById('priority');
	const form = document.getElementById('form');

	form.setAttribute(
		'onsubmit',
		"updateTicket('" + ticket._id + "'); return false"
	);
	project.setAttribute('value', `${ticket.project}`);
	summary.setAttribute('value', `${ticket.summary}`);
	priority.setAttribute('value', `${ticket.priority}`);
	document.getElementById('description').value = `${ticket.description}`;
	setButtons();
};

fillDataIntoInputs();

updateTicket = id => {
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
		axios
			.patch(
				`https://kents-bug-tracker-api.herokuapp.com/tickets/${id}`,
				{
					project,
					summary,
					priority,
					description
				},
				config
			)
			.then((window.location = '/Public'))
			.catch(error => console.log(error));
	} else {
		displayErrors();
	}
};

completedTicket = id => {
	if (ticket.completed === false) {
		axios
			.patch(
				`https://kents-bug-tracker-api.herokuapp.com/tickets/${id}`,
				{
					completed: true
				},
				config
			)
			.then((window.location = '/Public'));
	} else {
		axios
			.patch(
				`https://kents-bug-tracker-api.herokuapp.com/tickets/${id}`,
				{
					completed: false
				},
				config
			)
			.then((window.location = '/Public'));
	}
};

removeTicket = id => {
	axios
		.delete(
			`https://kents-bug-tracker-api.herokuapp.com/tickets/${id}`,
			config
		)
		.then(response => {
			localStorage.removeItem('ticket');
			window.location = '/Public';
		})
		.catch(error => {
			console.log(error);
		});
};

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
	if (priority === 'high' || priority === 'medium' || priority === 'low') {
		const noError = document.getElementById('priorityError');
		noError.setAttribute('class', 'priotiryError noError');
	} else {
		errors.push('priorityError');
	}
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
