const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		trim: true
	},
	email: {
		type: String,
		rquired: true,
		trim: true
	},
	username: {
		type: String,
		required: true,
		minlength: 2,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	resetCode: {
		type: Number,
		required: false
	}
});

module.exports = User = mongoose.model('user', UserSchema);
