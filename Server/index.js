const express = require('express');
require('./mongoose');
const User = require('./Models/User');
const Ticket = require('./Models/Ticket');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
	const user = new User(req.body);

	user.save()
		.then(() => {
			res.send(user);
		})
		.catch(error => {
			res.status(400).send(error);
		});
});

app.post('/Tickets', (req, res) => {
	const ticket = new Ticket(req.body);

	ticket
		.save()
		.then(() => {
			res.send(ticket);
		})
		.catch(error => {
			res.status(400).send(error);
		});
});

app.get('/Tickets', (req, res) => {
	Ticket.find({})
		.then(tickets => {
			res.send(tickets);
		})
		.catch(error => {
			console.log(error);
		});
});

app.listen(port, () => {
	console.log(`Server up on ${port}`);
});
