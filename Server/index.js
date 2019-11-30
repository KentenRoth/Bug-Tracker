const express = require('express');
require('./mongoose');
const userRouter = require('./Routers/user');
const ticketRouter = require('./Routers/ticket');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(ticketRouter);

app.listen(port, () => {
	console.log(`Server up on ${port}`);
});
