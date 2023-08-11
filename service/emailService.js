const { transporter } = require('../employee_app/services/emailService');

const emailSender = async (to, subject,status) => {
    await transporter.sendMail({
        from: "nameste380@gmail.com",
        to: to,
        subject: subject,
        html: `<!DOCTYPE html>
            <html lang="en">

            <body>
                <h1>Welcome to Employee Tracking System</h1>
                <p>Your leave was ${status} by admin</p>
                <p><a href="https://www.youtube.com/watch?v=dfKIpZ3jat4">Your Link</a></p>
            </body>

            </html>`
    });

    return true;
};

module.exports = emailSender;
