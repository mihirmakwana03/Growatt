const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Portfolio = require("../models/Portfolio");

// ✅ Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "../uploadsimg");
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

// ✅ Create Portfolio Item
<<<<<<< HEAD
// ✅ Create Portfolio Item
=======
>>>>>>> a4bac4c (first commit)
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        const newData = new Portfolio({
            title: req.body.title,
            description: req.body.description,
            imageUrl: `/uploadsimg/${req.file.filename}`,
            type: req.body.type, // ✅ Fix: type is from req.body, not req.file
        });

        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        console.error("❌ Upload Error:", error);
        res.status(500).json({ error: "Failed to upload" });
    }
});

// ✅ Get All Portfolio Items
router.get("/", async (req, res) => {
    try {
        const { type } = req.query;
        const query = type ? { type } : {}; // If a type is provided, filter by type
        const portfolio = await Portfolio.find(query);
        res.json(portfolio);
    } catch (error) {
        console.error("❌ Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});


// ✅ Delete Portfolio Item
router.delete("/:id", async (req, res) => {
    try {
        const item = await Portfolio.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });

        // Delete file from server
        if (item.imageUrl) {
            const filePath = path.join(__dirname, "..", item.imageUrl);
            fs.unlink(filePath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });
        }

        await Portfolio.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("❌ Delete Error:", error);
        res.status(500).json({ error: "Failed to delete" });
    }
});

module.exports = router;
