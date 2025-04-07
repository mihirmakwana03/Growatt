const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");

// ✅ Add a testimonial
router.post("/", async (req, res) => {
    try {
        const { name, message, rating } = req.body;
        const newTestimonial = new Testimonial({ name, message, rating });
        await newTestimonial.save();
        res.status(201).json({ success: true, testimonial: newTestimonial });
    } catch (error) {
        res.status(500).json({ error: "Failed to add testimonial" });
    }
});

// ✅ Get all testimonials
router.get("/", async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch testimonials" });
    }
});

// ✅ Delete a testimonial
router.delete("/:id", async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete testimonial" });
    }
});

module.exports = router;
