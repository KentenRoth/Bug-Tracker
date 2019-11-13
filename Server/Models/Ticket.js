const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
	created: {
		type: String,
		required: true,
		trim: true
	},
	summary: {
		type: String,
		required: true,
		minlength: 5,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		required: true
	},
	priority: {
		type: String,
		required: true
	}
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
