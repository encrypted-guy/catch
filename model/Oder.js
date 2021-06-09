const mongoose = require('mongoose');
const slugify = require('slugify');
const oderSchema = new mongoose.Schema({
    oders: [{
        Quantity: {
            type: Number
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'product'
        }
    }],
    total: [],
    buyerID: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
});
module.exports = mongoose.model('oder', oderSchema);