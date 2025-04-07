const express = require("express");
const multer = require("multer");
const Application = require("../models/Application");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ✅ Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, "../uploadspdf");
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// ✅ Handle job application submissions
router.post("/", upload.single("resume"), async (req, res) => {
    try {
        console.log("📩 Received application data:", req.body);
        console.log("📄 Uploaded file:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "Resume file is required." });
        }

        if (!req.body.name || !req.body.email) {
            return res.status(400).json({ error: "Name and Email are required." });
        }

        const newApplication = new Application({
            jobId: req.body.jobId,
            jobTitle: req.body.jobTitle,
            name: req.body.name,
            email: req.body.email,
            resume: `/uploadspdf/${req.file.filename}`,
        });

        await newApplication.save();
        res.status(201).json({ message: "✅ Application submitted successfully!" });
    } catch (error) {
        console.error("❌ Error submitting application:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// ✅ Fetch all Applications
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        console.error("❌ Error fetching applications:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Delete an Application by ID and remove the associated file
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findById(id);

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        // ✅ Construct file path safely
        if (application.resume) {
            const filePath = path.resolve(__dirname, "../uploadspdf", path.basename(application.resume));

            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log("✅ File deleted successfully:", filePath);
                } else {
                    console.warn("⚠️ File not found, skipping deletion:", filePath);
                }
            } catch (fileError) {
                console.error("❌ Error deleting file:", fileError);
            }
        }

        // ✅ Remove from DB
        await Application.findByIdAndDelete(id);
        res.json({ message: "✅ Application deleted successfully!" });

    } catch (err) {
        console.error("❌ Error deleting application:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
