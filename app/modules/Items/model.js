const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    unit: {
        type: String,
        required: true,
        default: 'und',
    },
    value: {
        type: Number,
        required: true,
        default: 0,
    },
    received: {
        type: Number,
        required: true,
        default: 0,
    },
    sent: {
        type: Number,
        required: true,
        default: 0,
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

const Item = mongoose.model('items', ItemSchema);

module.exports = Item;