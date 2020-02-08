const bug = document.getElementById('bugs');

highPriority = (summaryContent, ticketID, taskCompleted) => {
	const box = document.createElement('div');
	box.setAttribute('class', 'box');
	const cardLeft = document.createElement('div');
	cardLeft.setAttribute('class', 'card high col-8');
	cardLeft.setAttribute('id', `ticket${ticketID}`);
	cardLeft.setAttribute('onClick', "selectedTicket('" + ticketID + "')");
	const cardRight = document.createElement('div');
	cardRight.setAttribute('class', 'cardRight high');

	const row = document.createElement('div');
	row.setAttribute('class', 'row');

	// Col 1
	const summaryTitle = document.createElement('div');
	summaryTitle.setAttribute('class', 'summary');
	summaryTitle.textContent = 'Summary:';
	const summaryMain = document.createElement('div');
	summaryMain.setAttribute('class', 'summary');
	summaryMain.textContent = summaryContent;

	row.appendChild(cardLeft);
	cardLeft.appendChild(summaryTitle);
	summaryTitle.appendChild(summaryMain);
	bug.appendChild(box);
	box.appendChild(row);

	// Col 2
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
		cardLeft.setAttribute('class', 'card completed col-8');
	}

	row.appendChild(cardRight);
	cardRight.appendChild(completeTop);
	completeTop.appendChild(completeCheck);
	completeCheck.appendChild(complete);
};

mediumPriority = (summaryContent, ticketID, taskCompleted) => {
	const box = document.createElement('div');
	box.setAttribute('class', 'box');
	const cardLeft = document.createElement('div');
	cardLeft.setAttribute('class', 'card medium col-8');
	cardLeft.setAttribute('id', `ticket${ticketID}`);
	cardLeft.setAttribute('onClick', "selectedTicket('" + ticketID + "')");
	const cardRight = document.createElement('div');
	cardRight.setAttribute('class', 'cardRight medium');

	const row = document.createElement('div');
	row.setAttribute('class', 'row');

	// Col 1
	const summaryTitle = document.createElement('div');
	summaryTitle.setAttribute('class', 'summary');
	summaryTitle.textContent = 'Summary:';
	const summaryMain = document.createElement('div');
	summaryMain.setAttribute('class', 'summary');
	summaryMain.textContent = summaryContent;

	row.appendChild(cardLeft);
	cardLeft.appendChild(summaryTitle);
	summaryTitle.appendChild(summaryMain);
	bug.appendChild(box);
	box.appendChild(row);

	// Col 2
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
		cardLeft.setAttribute('class', 'card completed col-8');
	}

	row.appendChild(cardRight);
	cardRight.appendChild(completeTop);
	completeTop.appendChild(completeCheck);
	completeCheck.appendChild(complete);
};

lowPriority = (summaryContent, ticketID, taskCompleted) => {
	const box = document.createElement('div');
	box.setAttribute('class', 'box');
	const cardLeft = document.createElement('div');
	cardLeft.setAttribute('class', 'card low col-8');
	cardLeft.setAttribute('id', `ticket${ticketID}`);
	cardLeft.setAttribute('onClick', "selectedTicket('" + ticketID + "')");
	const cardRight = document.createElement('div');
	cardRight.setAttribute('class', 'cardRight low');

	const row = document.createElement('div');
	row.setAttribute('class', 'row');

	// Col 1
	const summaryTitle = document.createElement('div');
	summaryTitle.setAttribute('class', 'summary');
	summaryTitle.textContent = 'Summary:';
	const summaryMain = document.createElement('div');
	summaryMain.setAttribute('class', 'summary');
	summaryMain.textContent = summaryContent;

	row.appendChild(cardLeft);
	cardLeft.appendChild(summaryTitle);
	summaryTitle.appendChild(summaryMain);
	bug.appendChild(box);
	box.appendChild(row);

	// Col 2
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
		cardLeft.setAttribute('class', 'card completed col-8');
	}

	row.appendChild(cardRight);
	cardRight.appendChild(completeTop);
	completeTop.appendChild(completeCheck);
	completeCheck.appendChild(complete);
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
		ticket.setAttribute('class', `card ${priority} col-8`);
	} else {
		ticket.setAttribute('class', 'card completed col-8');
	}
};

completedTicket = id => {
	axios
		.patch(
			`https://kents-bug-tracker-api.herokuapp.com/tickets/${id}`,
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
			`https://kents-bug-tracker-api.herokuapp.com/tickets/${id}`,
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
	let url = '';
	let showCompleted = localStorage.getItem('hideCompleted');
	if (showCompleted === 'false') {
		url =
			'https://kents-bug-tracker-api.herokuapp.com/tickets?completed=false';
	} else {
		url = 'https://kents-bug-tracker-api.herokuapp.com/tickets';
	}
	axios
		.get(`${url}`, config)
		.then(response => {
			const tickets = response.data;
			if (tickets.length === 0) {
				retrun;
			}
			projectSelect(tickets);
			sortByPriority(tickets);
			hideCompleted();
			sortByProjectName(tickets).map(ticket => {
				if (ticket.priority === 'high') {
					highPriority(ticket.summary, ticket._id, ticket.completed);
				}
				if (ticket.priority === 'medium') {
					mediumPriority(
						ticket.summary,
						ticket._id,
						ticket.completed
					);
				}
				if (ticket.priority === 'low') {
					lowPriority(ticket.summary, ticket._id, ticket.completed);
				}
			});
		})
		.catch(error => {
			window.location = '/Public/login.html';
		});
};

projectSelect = tickets => {
	const projectName = document.getElementById('projectName');
	const projectSelect = document.createElement('select');
	projectSelect.setAttribute('id', 'projectSelect');
	projectSelect.setAttribute('onchange', 'setProjectName()');
	let projectTitle = [];
	tickets.map(ticket => {
		const projectTitleConsistency = ticket.project
			.toLowerCase()
			.split(' ')
			.map(s => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ');

		const lowerCase = ticket.project.toLowerCase();

		if (!projectTitle.includes(lowerCase)) {
			projectTitle.push(lowerCase);
			const projectOption = document.createElement('option');
			projectOption.setAttribute('value', lowerCase);
			projectOption.setAttribute('id', lowerCase);
			projectOption.textContent = projectTitleConsistency;

			projectSelect.appendChild(projectOption);
		}
	});

	projectName.appendChild(projectSelect);
	setSelectedProject(projectTitle);
	sortByProjectName(tickets);
};

setSelectedProject = arr => {
	if (arr.length <= 1) {
		return;
	}
	const projectSelected = localStorage.getItem('projectName');
	arr.map(project => {
		if (project === projectSelected) {
			const currentProject = document.getElementById(projectSelected);
			currentProject.setAttribute('selected', true);
		}
	});
};

setProjectName = () => {
	const e = document.getElementById('projectSelect');
	const projectName = e.options[e.selectedIndex].value;
	localStorage.setItem('projectName', projectName);
	location.reload();
};

sortByProjectName = tickets => {
	let currentProject = [];
	const e = document.getElementById('projectSelect');
	let projectName = e.options[e.selectedIndex].value;

	tickets.map(ticket => {
		if (ticket.project.toLowerCase() === projectName) {
			currentProject.push(ticket);
		}
	});
	return currentProject;
};

sortByPriority = tickets => {
	var priorityLevels = {
		high: 0,
		medium: 1,
		low: 2
	};
	tickets.sort((a, b) => {
		return priorityLevels[a.priority] - priorityLevels[b.priority];
	});
};

selectedTicket = ticketID => {
	axios
		.get(
			`https://kents-bug-tracker-api.herokuapp.com/tickets/${ticketID}`,
			config
		)
		.then(response => {
			localStorage.setItem('ticket', JSON.stringify(response.data));
			window.location = '/Public/edit.html';
		})
		.catch(error => {
			console.log(error);
		});
};

showCompletedChecked = () => {
	const isChecked = document.getElementById('hideCompleted').checked;

	if (isChecked === true) {
		localStorage.setItem('hideCompleted', true);
		return true;
	} else {
		localStorage.setItem('hideCompleted', false);
	}
};

toggleHideCompletedInLS = () => {
	let hideCompletedValue = document.getElementById('hideCompleted').checked;
	localStorage.setItem('hideCompleted', hideCompletedValue);
	location.reload();
};

hideCompleted = () => {
	let hideCompletedDisplay = document.getElementById('hideCompleted');
	let hideCompletedLS = localStorage.getItem('hideCompleted');

	if (hideCompletedLS === 'true' || hideCompletedLS === null) {
		hideCompletedDisplay.setAttribute('checked', 'true');
	}
};

getTickets();
