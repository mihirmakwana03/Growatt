const express = require("express");
const router = express.Router();

const Testimonial = require("../models/Testimonial"); // ✅ This model is used correctly now
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "../uploadsimgtestimonial");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// ✅ Create Testimonial
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        const newData = new Testimonial({ // ✅ Corrected model name
            name: req.body.name,
            message: req.body.message,
            imageUrl: `/uploadsimgtestimonial/${req.file.filename}`,
            rating: req.body.rating,
        });

        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        console.error("❌ Upload Error:", error);
        res.status(500).json({ error: "Failed to upload" });
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


// ✅ Delete multiple testimonials with image deletion
// ✅ Delete multiple testimonials with image deletion
router.delete("/", async (req, res) => {

    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: "No valid IDs provided for deletion." });
        }


        // Fetch testimonials to get their image paths
        const items = await Testimonial.find({ _id: { $in: ids } });

        for (const item of items) {
            if (item.imageUrl) {
                const filePath = path.join(__dirname, "..", item.imageUrl);

                // Log file path to ensure correctness
                console.log("File path to delete:", filePath);

                // Delete the file from the server
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    } else {
                        console.log("File deleted successfully:", filePath);
                    }
                });
            }
        }

        // Delete testimonials from the database
        await Testimonial.deleteMany({ _id: { $in: ids } });

        res.status(200).json({ message: "Testimonials deleted successfully." });
    } catch (error) {
        console.error("❌ Error deleting testimonials:", error);
        res.status(500).json({ error: "Server error while deleting testimonials." });
    }
});

module.exports = router;
