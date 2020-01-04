const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
	name: String,
	fullname: String,
	email: String,
	number: String,
	message: String,
	subject: String
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
