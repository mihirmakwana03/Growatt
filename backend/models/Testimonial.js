const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
<<<<<<< HEAD
=======
    imageUrl: { type: String, required: true },
>>>>>>> a4bac4c (first commit)
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
