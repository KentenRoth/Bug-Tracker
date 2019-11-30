const express = require('express');
const router = new express.Router();
const User = require('../Models/User');

router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/users', async (req, res) => {
	try {
		const user = await User.find();
		res.send(user);
	} catch (error) {
		res.status(500).send;
	}
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findByIdAndDelete(_id);

		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (error) {
		res.status(500).send();
	}
});

module.exports = router;
