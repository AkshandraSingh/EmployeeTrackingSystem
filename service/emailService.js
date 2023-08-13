const { transporter } = require('../employee_app/services/emailService');

const mailOptions = async (to, subject, status) => {
    await transporter.sendMail({
        from: '"Employee Tracking System" <nameste380@gmail.com>',
        to: to,
        subject: subject,
        html: `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>

            <body>
                <h1>Information about for your leave</h1>
                <p>Your leave was ${status} by admin</p>
                <p><a href="link">Your Link</a></p>
            </body>

            </html>`
    });

    return true;
};

module.exports = mailOptions;
