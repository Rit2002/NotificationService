const mongoose = require('mongoose');

const ticketNotificationSchema = new mongoose.Schema({
    subject:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    recipientEmail: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['SUCCESS', 'FAILED', 'PENDING'],
            message: " invalid ticket status"
        },
        default: 'PENDING',
    }
}, { timestamps: true });

const ticketNotificationModel = mongoose.model('TicketNotifiaction', ticketNotificationSchema);

module.exports = ticketNotificationModel;