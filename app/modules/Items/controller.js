const Item = require('./model');
const response = require('../../network/response');

exports.createItem = async (req, res, next) => {
    try {
        const { name, quantity, unit, value } = req.body;
        const newItem = new Item({ name, quantity, unit, value });
        await newItem.save();
        const toSend = {
            data: newItem,
            message: "Item created successfully."
        };
        response.success(req, res, toSend, 201);
    } catch (error) {
        next(error);
    }
}

exports.getItems = async (req, res, next) => {
    try {
        const items = await Item.find({});
        if (items.length === 0) {
            response.success(req, res, null, 204);
        } else {
            const toSend = {
                data: items,
                total: items.length
            };
            response.success(req, res, toSend, 200);
        }
    } catch (error) {
        next(error);
    }
}

exports.getItem = async (req, res, next) => {
    try {
        const itemId = req.params.codeId;
        const items = await Item.findById(itemId);
        if (items) {
            response.success(req, res, { data: items }, 200);
        } else {
            response.error(req, res, 'Item not found', 404, null);
        }   
    } catch (error) {
        next(error);
    }
}

exports.updateItem = async (req, res, next) => {
    try {
        const itemId = req.params.codeId;
        req.body.updateDate = Date.now();
        await Item.findByIdAndUpdate(itemId, req.body);
        const item = await Item.findById(itemId);
        if (item) {
            response.success(req, res, { data: item }, 200);
        } else {
            response.error(req, res, 'Item not found', 404, null);
        }
    } catch (error) {
        next(error);
    }
}

exports.deleteItem = async (req, res, next) => {
    try {
        const itemId = req.params.codeId;
        const item = await Item.findById(itemId);
        if (item) {
            await Item.findByIdAndDelete(itemId);
            const toSend = {
                data: null,
                message: 'Item has been deleted'
            };
            response.success(req, res, toSend, 200);
        } else {
            response.error(req, res, 'Item not found', 404, null);
        }
    } catch (error) {
        next(error);
    }
}