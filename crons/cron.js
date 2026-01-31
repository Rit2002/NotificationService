const cron = require('node-cron');
const Ticket = require('../models/ticketNotification.model');
const Mailer = require('../services/email.service');

const mailerCron = () => {

    const mailer = Mailer(process.env.EMAIL, process.env.EMAIL_PASS);

    cron.schedule('*/2 * * * *', async () => {
        const notificationToBeSent = await Ticket.find({
            status: 'PENDING'
        });
        
        notificationToBeSent.forEach( notification => {
            const mailData = {
                from: 'mba@support.com',
                to: notification.recipientEmail,
                subject: notification.subject,
                text: notification.content
            };

            mailer.sendMail(mailData, async (err, data) => {
                if(err) {
                    console.log(err);                    
                }
                else{
                    notification.status = 'SUCCESS';
                    await notification.save();
                }
            });

        });
    });
}

module.exports = {
    mailerCron
}