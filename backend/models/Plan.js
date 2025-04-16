const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    title: String,
    description: String,
    basicPrice: Number,
    advancePrice: Number,
    premiumPrice: Number,
    features: [String]
});

module.exports = mongoose.model('priceDetails', planSchema);
