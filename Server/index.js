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

app.get('/users/:id', (req, res) => {
	const _id = req.params.id;
	User.findById({ _id })
		.then(user => {
			if (!user) {
				return res.status(404).send();
			}
			res.send(user);
		})
		.catch(error => {
			res.status(500).send;
		});
});

app.post('/tickets', (req, res) => {
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

app.get('/tickets', (req, res) => {
	Ticket.find({})
		.then(tickets => {
			res.send(tickets);
		})
		.catch(error => {
			res.status(500).send(error);
		});
});

app.get('/tickets/:id', (req, res) => {
	const _id = req.params.id;

	Ticket.findById(_id)
		.then(ticket => {
			if (!ticket) {
				return res.status(404).send();
			}
			res.send(ticket);
		})
		.catch(error => {
			res.status(500).send();
		});
});

app.listen(port, () => {
	console.log(`Server up on ${port}`);
});
