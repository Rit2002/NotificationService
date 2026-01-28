const ticketController = require('../controllers/ticket.controller');
const ticketMiddleware = require('../middlewares/ticket.middleware');

const routes = (app) => {

    app.post(
        '/notiservice/api/v1/notifications',
        ticketMiddleware.verifyTicketNotificationCreateRequest,
        ticketController.create
    )
}

module.exports = routes;