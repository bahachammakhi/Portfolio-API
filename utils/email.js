const nodemailer = require('nodemailer');
const moment = require('moment');

const sendEmail = async (options) => {
	// 1) Create a transporter

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});
	// 2 define the email options
	const mailOptions = {
		from: `${options.fullname} 👻 <${options.email}>`,
		to: 'bahachammakhi25@gmail.com',
		subject: options.subject,
		text: options.message,
		html: `<div ><div style="padding:50px">Mail from : <b>👻${(options && options.fullname) ||
			(options &&
				options.email)}</b><br>👻Name:${options.fullname}<br>👻Message:${options.message}<br>👻Sended on : ${moment(
			Date.now()
		).format('MMMM Do YYYY, h:mm:ss a')}</div></div>`
	};
	//3 Actually send the email
	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
