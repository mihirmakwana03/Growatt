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

// ✅ Delete multiple testimonials
router.delete("/", async (req, res) => {  // ✅ Changed from app.delete to router.delete
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: "No valid IDs provided for deletion." });
        }

        await Testimonial.deleteMany({ _id: { $in: ids } });

        res.status(200).json({ message: "Testimonials deleted successfully." });
    } catch (error) {
        console.error("❌ Error deleting testimonials:", error);
        res.status(500).json({ error: "Server error while deleting testimonials." });
    }
});

module.exports = router;
