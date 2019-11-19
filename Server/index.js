const express = require('express');
require('./mongoose');
const User = require('./Models/User');

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

app.listen(port, () => {
	console.log(`Server up on ${port}`);
});
