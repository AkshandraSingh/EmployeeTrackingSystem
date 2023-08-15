const { transporter } = require('../employee_app/services/emailService');

const mailOptions = async (to, subject, status , message) => {
    await transporter.sendMail({
        from: '"Employee Tracking System" <nameste380@gmail.com>',
        to: to,
        subject: subject,
        html: `<!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">

                    <style>
                        h1 {
                            height: 60px;
                            width: 603px;
                            margin: auto;
                            text-align: center;
                            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                            font-size: 26px;
                        }

                        p {
                            height: 40px;
                            width: 403px;
                            margin: auto;
                            text-align: center;
                            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                            font-size: 18px;
                        }
                        a {
                            text-decoration: none;
                        }

                        a:hover {
                            color: tomato;
                        }

                        #message2 {
                            height: 40px;
                            margin-bottom: 22px;
                            font-weight: bold;
                        }
                    </style>

                </head>

                <body>
                    <h1>Welcome to Employee Tracking System</h1>
                    <p id="message">Hey your leave was ${status} by admin</p>
                    <p id="message2">Message By Admin: ${message}</p>
                    <p><a href="link">Contact Link</a></p>
                </body>

                </html>`
    });

    return true;
};

module.exports = mailOptions;
