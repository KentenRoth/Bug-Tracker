const express = require('express');
const router = new express.Router();
const Ticket = require('../Models/Ticket');

router.post('/tickets', async (req, res) => {
	const ticket = new Ticket(req.body);

	try {
		await ticket.save();
		res.send(ticket);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/tickets', async (req, res) => {
	try {
		const tickets = await Ticket.find({});
		res.send(tickets);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/tickets/:id', async (req, res) => {
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

router.patch('/tickets/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['completed', 'priority', 'summary', 'description'];
	const isValidUpdate = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Update not accepted.' });
	}

	try {
		const ticket = await Ticket.findById(id);
		updates.forEach(update => (ticket[update] = req.body[update]));

		await ticket.save();

		if (!ticket) {
			res.status(404).send();
		}
		res.send(ticket);
	} catch (error) {
		res.status(500).send();
	}
});

router.delete('/tickets/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const ticket = await Ticket.findByIdAndDelete(_id);
		if (!ticket) {
			return res.status(404).send();
		}
		res.send(ticket);
	} catch (error) {
		res.status(500).send();
	}
});

module.exports = router;
