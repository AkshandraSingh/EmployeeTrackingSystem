const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.Email,
        pass: process.env.PASS,
    }
});

module.exports = {
    transporter
}