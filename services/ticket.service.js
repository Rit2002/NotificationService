const Ticket = require('../models/ticketNotification.model');
const { STATUS_CODES } = require('../utils/constants');

const createTicket = async (data) => {
    try {
        const ticket = await Ticket.create(data);
        return ticket;

    } catch (error) {
        console.log(error);
        
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw {
                err : err,
                code : STATUS_CODES.UNPROCESSABLE_ENTITY
            };
        }

        throw error;
    }
}

module.exports = {
    createTicket
}