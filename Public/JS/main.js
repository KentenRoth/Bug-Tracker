const bug = document.getElementById('bugs');

highPriority = (summaryContent, ticketID, taskCompleted) => {
	const box = document.createElement('div');
	box.setAttribute('class', 'box');
	const card = document.createElement('div');
	card.setAttribute('class', 'card high');
	card.setAttribute('id', `ticket${ticketID}`);
	card.setAttribute('onClick', "selectedTicket('" + ticketID + "')");

	const row = document.createElement('div');
	row.setAttribute('class', 'row');

	// Col 1
	const summaryCol = document.createElement('div');
	summaryCol.setAttribute('class', 'col-8');
	const summaryTitle = document.createElement('div');
	summaryTitle.setAttribute('class', 'summary');
	summaryTitle.textContent = 'Summary:';
	const summaryMain = document.createElement('div');
	summaryMain.setAttribute('class', 'summary');
	summaryMain.textContent = summaryContent;

	row.appendChild(summaryCol);
	summaryCol.appendChild(summaryTitle);
	summaryTitle.appendChild(summaryMain);

	// Col 2

	const completeCol = document.createElement('div');
	completeCol.setAttribute('class', 'complete col-4');
	const completeTop = document.createElement('div');
	completeTop.setAttribute('class', 'top');
	completeTop.textContent = 'Complete';
	const completeCheck = document.createElement('div');
	completeCheck.setAttribute('class', 'checkboxHouse');
	const complete = document.createElement('input');
	complete.setAttribute('class', 'complete');
	complete.setAttribute('id', 'checkbox');
	complete.setAttribute('type', 'checkbox');
	complete.setAttribute('id', `${ticketID}`);
	complete.setAttribute('onClick', "checkboxClicked('" + ticketID + "')");
	if (taskCompleted === true) {
		complete.setAttribute('checked', 'true');
	}

	row.appendChild(completeCol);
	completeCol.appendChild(completeTop);
	completeTop.appendChild(completeCheck);
	completeCheck.appendChild(complete);

	bug.appendChild(box);
	box.appendChild(card);
	card.appendChild(row);
};

mediumPriority = (summaryContent, ticketID, taskCompleted) => {
	const box = document.createElement('div');
	box.setAttribute('class', 'box');
	const card = document.createElement('div');
	card.setAttribute('class', 'card medium');
	card.setAttribute('id', `ticket${ticketID}`);

	const row = document.createElement('div');
	row.setAttribute('class', 'row');

	// Col 1
	const summaryCol = document.createElement('div');
	summaryCol.setAttribute('class', 'col-8');
	const summaryTitle = document.createElement('div');
	summaryTitle.setAttribute('class', 'summary');
	summaryTitle.textContent = 'Summary:';
	const summaryMain = document.createElement('div');
	summaryMain.setAttribute('class', 'summary');
	summaryMain.textContent = summaryContent;

	row.appendChild(summaryCol);
	summaryCol.appendChild(summaryTitle);
	summaryTitle.appendChild(summaryMain);

	// Col 2

	const completeCol = document.createElement('div');
	completeCol.setAttribute('class', 'complete col-4');
	const completeTop = document.createElement('div');
	completeTop.setAttribute('class', 'top');
	completeTop.textContent = 'Complete';
	const completeCheck = document.createElement('div');
	completeCheck.setAttribute('class', 'checkboxHouse');
	const complete = document.createElement('input');
	complete.setAttribute('class', 'complete');
	complete.setAttribute('type', 'checkbox');
	complete.setAttribute('id', `${ticketID}`);
	complete.setAttribute('onClick', "checkboxClicked('" + ticketID + "')");
	if (taskCompleted === true) {
		complete.setAttribute('checked', 'true');
	}

	row.appendChild(completeCol);
	completeCol.appendChild(completeTop);
	completeTop.appendChild(completeCheck);
	completeCheck.appendChild(complete);

	bug.appendChild(box);
	box.appendChild(card);
	card.appendChild(row);
};

lowPriority = (summaryContent, ticketID, taskCompleted) => {
	const box = document.createElement('div');
	box.setAttribute('class', 'box');
	const card = document.createElement('div');
	card.setAttribute('class', 'card low');
	card.setAttribute('id', `ticket${ticketID}`);

	const row = document.createElement('div');
	row.setAttribute('class', 'row');

	// Col 1
	const summaryCol = document.createElement('div');
	summaryCol.setAttribute('class', 'col-8');
	const summaryTitle = document.createElement('div');
	summaryTitle.setAttribute('class', 'summary');
	summaryTitle.textContent = 'Summary:';
	const summaryMain = document.createElement('div');
	summaryMain.setAttribute('class', 'summary');
	summaryMain.textContent = summaryContent;

	row.appendChild(summaryCol);
	summaryCol.appendChild(summaryTitle);
	summaryTitle.appendChild(summaryMain);

	// Col 2

	const completeCol = document.createElement('div');
	completeCol.setAttribute('class', 'complete col-4');
	const completeTop = document.createElement('div');
	completeTop.setAttribute('class', 'top');
	completeTop.textContent = 'Complete';
	const completeCheck = document.createElement('div');
	completeCheck.setAttribute('class', 'checkboxHouse');
	const complete = document.createElement('input');
	complete.setAttribute('class', 'complete');
	complete.setAttribute('type', 'checkbox');
	complete.setAttribute('id', `${ticketID}`);
	complete.setAttribute('onClick', "checkboxClicked('" + ticketID + "')");
	if (taskCompleted === true) {
		complete.setAttribute('checked', 'true');
	}

	row.appendChild(completeCol);
	completeCol.appendChild(completeTop);
	completeTop.appendChild(completeCheck);
	completeCheck.appendChild(complete);

	bug.appendChild(box);
	box.appendChild(card);
	card.appendChild(row);
};

const token = localStorage.getItem('authToken');

const config = {
	headers: {
		Authorization: 'Bearer ' + token
	}
};

checkboxClicked = ticketID => {
	const checkbox = document.getElementById(`${ticketID}`).checked;
	if (checkbox === true) {
		completedTicket(ticketID);
	} else {
		unCompletedTicket(ticketID);
	}
};

updateTaskDisplay = (id, priority, completed) => {
	const ticket = document.getElementById('ticket' + id);
	if (completed === false) {
		ticket.setAttribute('class', `card ${priority}`);
	} else {
		ticket.setAttribute('class', 'card completed');
	}
};

completedTicket = id => {
	axios
		.patch(
			`http://localhost:3000/tickets/${id}`,
			{
				completed: true
			},
			config
		)
		.then(response => {
			if (response.status === 200) {
				const priority = response.data.priority;
				const completed = response.data.completed;
				updateTaskDisplay(id, priority, completed);
			}
		})
		.catch(error => {
			document.getElementById('checkbox').checked = true;
			console.log(error);
		});
};

unCompletedTicket = id => {
	axios
		.patch(
			`http://localhost:3000/tickets/${id}`,
			{
				completed: false
			},
			config
		)
		.then(response => {
			if (response.status === 200) {
				const priority = response.data.priority;
				const completed = response.data.completed;
				updateTaskDisplay(id, priority, completed);
			}
		})
		.catch(error => {
			document.getElementById('checkbox').checked = true;
			console.log(error);
		});
};

getTickets = () => {
	axios.get('http://localhost:3000/tickets', config).then(response => {
		const tickets = response.data;
		tickets.map(ticket => {
			if (ticket.priority === 'high') {
				highPriority(ticket.summary, ticket._id, ticket.completed);
			}
			if (ticket.priority === 'medium') {
				mediumPriority(ticket.summary, ticket._id, ticket.completed);
			}
			if (ticket.priority === 'low') {
				lowPriority(ticket.summary, ticket._id, ticket.completed);
			}
		});
	});
};

selectedTicket = ticketID => {
	axios
		.get(`http://localhost:3000/tickets/${ticketID}`, config)
		.then(response => {
			localStorage.setItem('ticket', JSON.stringify(response.data));
			window.location = '/Public/edit.html';
		})
		.catch(error => {
			console.log(error);
		});
};

getTickets();
