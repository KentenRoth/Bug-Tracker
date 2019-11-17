const mongoose = require('mongoose');
const validator = require('validator');
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
		trim: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is not valid');
			}
		}
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
