const Contact = require('./../models/contactsModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

exports.getAllContacts = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Contact.find(), req.query).filter().sort().limitFields().paginate();

	const contact = await features.query;

	res.status(200).json({
		status: 'success',
		results: contact.length,
		data: {
			contact
		}
	});
});

exports.createContact = catchAsync(async (req, res, next) => {
	const newContact = await Contact.create(req.body);
	const options = {
		email: req.body.email,
		fullname: req.body.fullname,
		message: req.body.message,
		subject: '👻Mail from my Portfolio👻'
	};
	const emailsended = sendEmail(options);
	res.status(201).json({
		status: 'success',
		email: emailsended,
		data: {
			contact: newContact
		}
	});
});

exports.deleteContact = catchAsync(async (req, res, next) => {
	const contact = await Contact.findByIdAndDelete(req.params.id);
	if (!contact) {
		return next(new AppError('No Contact found with that id', 404));
	}

	res.status(204).json({
		status: 'success',
		data: null
	});
});
