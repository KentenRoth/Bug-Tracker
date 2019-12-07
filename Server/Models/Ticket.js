const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
	created: {
		type: Number,
		default: Date.now,
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
	},
	project: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
