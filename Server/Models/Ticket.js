const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
	created: {
		type: Date,
		default: Date.now,
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
		default: false,
		required: true
	},
	priority: {
		type: String,
		required: true
	}
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
