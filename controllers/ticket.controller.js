const ticketService = require('../services/ticket.service');
const { STATUS_CODES } = require('../utils/constants');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');

const create = async (req, res) => {
    try {
        const response = await ticketService.createTicket(req.body);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created a ticket';

        return res.status(STATUS_CODES.CREATED).json(successResponseBody);

    } catch (error) {
        console.log(error);
        
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllTicket = async (req, res) => {
    try {
        const response = await ticketService.getAll();

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully fetched all the tickets';

        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTicket = async (req, res) => {
    try {
        const response = await ticketService.getById(req.params.id);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully fetched all the tickets';

        return res.status(STATUS_CODES.OK).json(successResponseBody);

    } catch (error) {

        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create,
    getAllTicket,
    getTicket
}