var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	gender: String,
	race: String,
	city: String,
	state: String,
	occupation: String
});