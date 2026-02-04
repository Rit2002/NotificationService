const { STATUS_CODES } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');

const verifyTicketNotificationCreateRequest = (req, res, next) => {

    if(!req.body.subject) {
        errorResponseBody.err = 'No subject provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.content) {
        errorResponseBody.err = 'No content provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if( !req.body.recipientEmail ||
        !(req.body.recipientEmail instanceof Array) ||
        req.body.recipientEmail.length <= 0
    ) {
        errorResponseBody.err = 'No Email provided';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // everything is okay
    next();
}

module.exports = {
    verifyTicketNotificationCreateRequest
}