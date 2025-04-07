const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    imageUrl: { type: String },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
