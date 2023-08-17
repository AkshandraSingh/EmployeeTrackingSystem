const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.Email,
        pass: process.env.PASS,
    }
});

const mailOptions = async (to, subject, status=0, message=0,link) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                h1, p {
                    margin: auto;
                    text-align: center;
                    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                }
                h1 { font-size: 26px; height: 60px; width: 603px; }
                p { font-size: 18px; height: 40px; width: 403px; }
            </style>
        </head>
        <body>
            <h1>Welcome to Employee Tracking System</h1>
            <p id="message">Hey, your leave was ${status} by admin</p>
            <p id="message2">Message By Admin: ${message}</p>
        </body>
        </html>
    `;

    try {
        if ((status,message)) {
            await transporter.sendMail({
                from: '"Employee Tracking System" <nameste380@gmail.com>',
                to: to,
                subject: subject,
                html: htmlContent
            });
        }
        else {
            await transporter.sendMail({
                from: '"Employee Tracking System" <nameste380@gmail.com>',
                to: to,
                subject: subject,
                html: `<a href="${link}">Link for reset Password</a>`
            });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = mailOptions;
