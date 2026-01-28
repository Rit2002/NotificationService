const nodemailer = require('nodemailer');

const sendEmail = (userId, password) => {
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: userId,
            pass: password
        }
    });

    transport.sendMail({
        from:'mba@gmail.com',
        to: 'riteshchavan5297@gmail.com',
        subject: 'Test email for nodemailer',
        text: 'Hey, this is a test mail'
    });
}

module.exports = sendEmail;