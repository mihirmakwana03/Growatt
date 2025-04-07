const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    rating: Number,
    review: String,
});

const Review = mongoose.model("Review", reviewSchema);