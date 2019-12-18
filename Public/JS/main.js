const bug = document.getElementById('bugs');

highPriority = () => {
	const box = document.createElement('div');
	box.setAttribute('class', 'box');
	const card = document.createElement('div');
	card.setAttribute('class', 'card high');
	const row = document.createElement('div');
	row.setAttribute('class', 'row');

	// Col 1
	const date = document.createElement('div');
	date.setAttribute('class', 'date');
	date.textContent = '11/10/2019';
	const dateCol = document.createElement('div');
	dateCol.setAttribute('class', 'col-4');
	const dateTop = document.createElement('div');
	dateTop.setAttribute('class', 'top');
	dateTop.textContent = 'Created On:';

	row.appendChild(dateCol);
	dateCol.appendChild(dateTop);
	dateTop.appendChild(date);

	// Col 2
	const summaryCol = document.createElement('div');
	summaryCol.setAttribute('class', 'summary col-4');
	const summaryTop = document.createElement('div');
	summaryTop.setAttribute('class', 'top');
	summaryTop.textContent = 'Summary:';
	const summary = document.createElement('div');
	summary.setAttribute('class', 'summary');
	summary.textContent = 'This is short summary';

	row.appendChild(summaryCol);
	summaryCol.appendChild(summaryTop);
	summaryTop.appendChild(summary);

	// Col 3
	const completeCol = document.createElement('div');
	completeCol.setAttribute('class', 'complete col-4');
	const completeTop = document.createElement('div');
	completeTop.setAttribute('class', 'top');
	completeTop.textContent = 'Complete';
	const completeCheck = document.createElement('div');
	const complete = document.createElement('input');
	complete.setAttribute('class', 'complete');
	complete.setAttribute('type', 'checkbox');

	row.appendChild(completeCol);
	completeCol.appendChild(completeTop);
	completeTop.appendChild(completeCheck);
	completeCheck.appendChild(complete);

	bug.appendChild(box);
	box.appendChild(card);
	card.appendChild(row);
};

mediumPriority = () => {
	const box = document.createElement('div');
	box.setAttribute('class', 'box');
	const card = document.createElement('div');
	card.setAttribute('class', 'card medium');
	const row = document.createElement('div');
	row.setAttribute('class', 'row');

	// Col 1
	const date = document.createElement('div');
	date.setAttribute('class', 'date');
	date.textContent = '11/10/2019';
	const dateCol = document.createElement('div');
	dateCol.setAttribute('class', 'col-4');
	const dateTop = document.createElement('div');
	dateTop.setAttribute('class', 'top');
	dateTop.textContent = 'Created On:';

	row.appendChild(dateCol);
	dateCol.appendChild(dateTop);
	dateTop.appendChild(date);

	// Col 2
	const summaryCol = document.createElement('div');
	summaryCol.setAttribute('class', 'summary col-4');
	const summaryTop = document.createElement('div');
	summaryTop.setAttribute('class', 'top');
	summaryTop.textContent = 'Summary:';
	const summary = document.createElement('div');
	summary.setAttribute('class', 'summary');
	summary.textContent = 'This is short summary';

	row.appendChild(summaryCol);
	summaryCol.appendChild(summaryTop);
	summaryTop.appendChild(summary);

	// Col 3
	const completeCol = document.createElement('div');
	completeCol.setAttribute('class', 'complete col-4');
	const completeTop = document.createElement('div');
	completeTop.setAttribute('class', 'top');
	completeTop.textContent = 'Complete';
	const completeCheck = document.createElement('div');
	const complete = document.createElement('input');
	complete.setAttribute('class', 'complete');
	complete.setAttribute('type', 'checkbox');

	row.appendChild(completeCol);
	completeCol.appendChild(completeTop);
	completeTop.appendChild(completeCheck);
	completeCheck.appendChild(complete);

	bug.appendChild(box);
	box.appendChild(card);
	card.appendChild(row);
};

lowPriority = () => {
	const box = document.createElement('div');
	box.setAttribute('class', 'box');
	const card = document.createElement('div');
	card.setAttribute('class', 'card low');
	const row = document.createElement('div');
	row.setAttribute('class', 'row');

	// Col 1
	const date = document.createElement('div');
	date.setAttribute('class', 'date');
	date.textContent = '11/10/2019';
	const dateCol = document.createElement('div');
	dateCol.setAttribute('class', 'col-4');
	const dateTop = document.createElement('div');
	dateTop.setAttribute('class', 'top');
	dateTop.textContent = 'Created On:';

	row.appendChild(dateCol);
	dateCol.appendChild(dateTop);
	dateTop.appendChild(date);

	// Col 2
	const summaryCol = document.createElement('div');
	summaryCol.setAttribute('class', 'summary col-4');
	const summaryTop = document.createElement('div');
	summaryTop.setAttribute('class', 'top');
	summaryTop.textContent = 'Summary:';
	const summary = document.createElement('div');
	summary.setAttribute('class', 'summary');
	summary.textContent = 'This is short summary';

	row.appendChild(summaryCol);
	summaryCol.appendChild(summaryTop);
	summaryTop.appendChild(summary);

	// Col 3
	const completeCol = document.createElement('div');
	completeCol.setAttribute('class', 'complete col-4');
	const completeTop = document.createElement('div');
	completeTop.setAttribute('class', 'top');
	completeTop.textContent = 'Complete';
	const completeCheck = document.createElement('div');
	const complete = document.createElement('input');
	complete.setAttribute('class', 'complete');
	complete.setAttribute('type', 'checkbox');

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

getTickets = () => {
	axios
		.get('http://localhost:3000/tickets', config)
		.then(response => console.log(response));
};

getTickets();
