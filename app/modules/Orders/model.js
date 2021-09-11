const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ItemSchema } = require('../Items/model');
const Item = mongoose.model('items', ItemSchema).schema;

const OrderSchema = new Schema({
    items: {
        type: [Item],
        required: true,
    },
    totalValue: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        required: true,
    },
    nature: {
        type: String,
        enum: ["inward", "outward"],
        required: true,
        unique: false,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    createDate: { 
        type: Date, 
        default: Date.now 
    },
    updateDate: { 
        type: Date, 
        default: Date.now 
    }
});

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;