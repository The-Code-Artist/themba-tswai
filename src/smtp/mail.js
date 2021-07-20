const nodemailer = require("nodemailer");

require("dotenv").config();

// Store SMTP logon credentials in an object.
const auth = {
    username: process.env.SMTP_USER,
    password: process.env.SMTP_PASS
};

// Define a transport so that emails can be sent.
const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 25,
    secure: false,
    auth: {
        user: auth.username,
        pass: auth.password
    }
});

/** Sends an email using the nodemailer transport object. */
const sendEmail = (email, subject, message, callback) => {
    // Store all mail options in an object.
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.EMAIL_RECIPIENT,
        subject: subject,
        html: message
    };

    // Using the transport object defined, send the email.
    transport.sendMail(mailOptions, (err, data) => {
        if (err)
            callback(err, null);
        else
            callback(null, data);
    })
}

module.exports = sendEmail;
