const ticket = JSON.parse(localStorage.getItem('ticket'));
const token = localStorage.getItem('authToken');

const config = {
	headers: {
		Authorization: 'Bearer ' + token
	}
};

setButtons = () => {
	const id = ticket._id;
	const complete = document.getElementById('complete');
	complete.setAttribute('onClick', "completedTicket('" + id + "')");
	if (ticket.completed === false) {
		complete.innerHTML = 'Complete';
	} else {
		complete.innerHTML = 'Un-Complete';
	}
};

setButtons();

fillDataIntoInputs = () => {
	const ticket = JSON.parse(localStorage.getItem('ticket'));
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
};

fillDataIntoInputs();

updateTicket = id => {
	const project = document.getElementById('project').value;
	const summary = document.getElementById('subject').value;
	const priority = document.getElementById('priority').value.toLowerCase();
	const description = document.getElementById('description').value;
	axios
		.patch(
			`http://localhost:3000/tickets/${id}`,
			{
				project,
				summary,
				priority,
				description
			},
			config
		)
		.then(response => console.log(response))
		.catch(error => console.log(error));
};

completedTicket = id => {
	if (ticket.completed === false) {
		axios.patch(
			`http://localhost:3000/tickets/${id}`,
			{
				completed: true
			},
			config
		);
		// .then((window.location = '/Public/main.html'));
	} else {
		axios.patch(
			`http://localhost:3000/tickets/${id}`,
			{
				completed: false
			},
			config
		);
		// .then((window.location = '/Public/main.html'));
	}
};

removeTicket = () => {};
