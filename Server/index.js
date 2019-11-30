const express = require('express');
require('./mongoose');
const User = require('./Models/User');
const Ticket = require('./Models/Ticket');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById({ _id });
		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (error) {
		res.status(500).send();
	}
});

app.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password'];
	const isValidUpdate = updates.every(update =>
		allowedUpdates.includes(update)
	);
	const _id = req.params.id;

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Update not taken.' });
	}

	try {
		const user = await User.findByIdAndUpdate(_id, req.body, {
			new: true,
			runValidators: true
		});

		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (error) {
		res.status(400).send();
	}
});

app.post('/tickets', async (req, res) => {
	const ticket = new Ticket(req.body);

	try {
		await ticket.save();
		res.send(ticket);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.get('/tickets', async (req, res) => {
	try {
		const tickets = await Ticket.find({});
		res.send(tickets);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get('/tickets/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const ticket = await Ticket.findById(_id);
		if (!ticket) {
			return res.status(404).send();
		}
		res.send(ticket);
	} catch (error) {
		res.status(500).send();
	}
});

app.patch('/tickets/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['completed', 'priority', 'summary', 'description'];
	const isValidUpdate = updates.every(update =>
		allowedUpdates.includes(update)
	);
	const _id = req.params.id;

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Update not accepted.' });
	}

	try {
		const ticket = await Ticket.findByIdAndUpdate(_id, req.body, {
			new: true,
			runValidators: true
		});
		if (!ticket) {
			res.status(404).send();
		}
		res.send(ticket);
	} catch (error) {
		res.status(500).send();
	}
});

app.listen(port, () => {
	console.log(`Server up on ${port}`);
});
