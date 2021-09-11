const Order = require('./model');
const response = require('../../network/response');

exports.createOrder = async (req, res, next) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        const toSend = {
            data: newOrder,
            message: "Order created successfully."
        };
        response.success(req, res, toSend, 201);
    } catch (error) {
        next(error);
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({});
        if (orders.length === 0) {
            response.success(req, res, null, 204);
        } else {
            const toSend = {
                data: orders,
                total: orders.length
            };
            response.success(req, res, toSend, 200);
        }
    } catch (error) {
        next(error);
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const orderId = req.params.codeId;
        const orders = await Order.findById(orderId);
        if (orders) {
            response.success(req, res, { data: orders }, 200);
        } else {
            response.error(req, res, 'Order not found', 404, null);
        }   
    } catch (error) {
        next(error);
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.codeId;
        req.body.updateDate = Date.now();
        await Order.findByIdAndUpdate(orderId, req.body);
        const order = await Order.findById(orderId);
        if (order) {
            response.success(req, res, { data: order }, 200);
        } else {
            response.error(req, res, 'Order not found', 404, null);
        }
    } catch (error) {
        next(error);
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.codeId;
        const order = await Order.findById(orderId);
        if (order) {
            await Order.findByIdAndDelete(orderId);
            const toSend = {
                data: null,
                message: 'Order has been deleted'
            };
            response.success(req, res, toSend, 200);
        } else {
            response.error(req, res, 'Order not found', 404, null);
        }
    } catch (error) {
        next(error);
    }
}