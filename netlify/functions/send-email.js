// netlify/functions/send-email.js
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    // Set up email transport and send email here
    // Example:
    const transporter = nodemailer.createTransport({
        // Your email service configuration here
    });

    const mailOptions = {
        from: 'Your Site <your-email@example.com>',
        to: 'recipient@example.com',
        subject: 'New Message from Contact Form',
        text: `From: ${body.name} \nEmail: ${body.email} \nPhone: ${body.phone} \nMessage: ${body.message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'success' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'error', error: error.toString() })
        };
    }
};
