const cron = require('node-cron');
const Ticket = require('../models/ticketNotification.model');
const Mailer = require('../services/email.service');

let isJobRunning = false;

const mailerCron = () => {
    const mailer = Mailer(process.env.EMAIL, process.env.EMAIL_PASS);

    cron.schedule('* * * * *', async () => {

        // Prevent overlapping runs
        if (isJobRunning) {
            console.log('Previous job still running. Skipping...');
            return;
        }

        isJobRunning = true;

        try {
            while (true) {

                // Atomically pick one PENDING ticket and mark as PROCESSING
                const notification = await Ticket.findOneAndUpdate(
                    { status: 'PENDING' },
                    { status: 'PROCESSING' },
                    { new: true }
                );

                // No more tickets left
                if (!notification) break;

                try {
                    await mailer.sendMail({
                        from: 'mba@support.com',
                        to: notification.recipientEmail,
                        subject: notification.subject,
                        text: notification.content
                    });

                    notification.status = 'SUCCESS';

                } catch (error) {
                    console.error('Mail send failed:', error);
                    notification.status = 'FAILED';
                }

                await notification.save();
            }

        } catch (err) {
            console.error('Cron job error:', err);
        } finally {
            isJobRunning = false;
        }
    });
};

module.exports = {
    mailerCron
}