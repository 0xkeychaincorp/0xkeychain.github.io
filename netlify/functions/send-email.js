const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 1025,
    secure: false,
    auth: {
        user: process.env.PROTON_EMAIL,
        pass: process.env.PROTON_PASSWORD
    }
});

exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    
    const mailOptions = {
        from: `"Your Site" <${process.env.PROTON_EMAIL}>`,
        to: '0xkeychain@proton.me',
        subject: 'New Contact Form Submission',
        text: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone}\nMessage: ${body.message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'success' })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'error', error: error.message })
        };
    }
};
