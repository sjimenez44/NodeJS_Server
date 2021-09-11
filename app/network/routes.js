const routesItems = require('../modules/Items/route');
const routesOrders = require('../modules/Orders/route');

const default_path = '/api/v1';

const routes = function (server) {
    server.use(default_path, routesItems);
    server.use(default_path, routesOrders);
}

module.exports = routes;