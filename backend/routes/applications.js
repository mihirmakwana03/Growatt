const express = require("express");
const multer = require("multer");
const Application = require("../models/Application");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ✅ Ensure upload folder exists
const uploadDir = path.resolve(__dirname, "../uploadspdf");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
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

        // ✅ Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        const newApplication = new Application({
            jobId: req.body.jobId,
            jobTitle: req.body.jobTitle,
            name: req.body.name,
            email: req.body.email,
            experience: Number(req.body.experience),  // ✅ Convert to Number
            twelvethPercentage: Number(req.body.twelvethPercentage),  // ✅ Convert to Number
            bachelorsDegree: Number(req.body.bachelorsDegree),  // ✅ Convert to Number
            resume: `/uploadspdf/${req.file.filename}`,
        });

        await newApplication.save();
        res.status(201).json({ message: "✅ Application submitted successfully!" });

    } catch (error) {
        console.error("❌ Error submitting application:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// ✅ Update application status by ID
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status is required." });
        }

        const application = await Application.findById(id);

        if (!application) {
            return res.status(404).json({ error: "Application not found." });
        }

        application.status = status;
        await application.save();

        res.json({ message: "✅ Application status updated successfully!", application });
    } catch (err) {
        console.error("❌ Error updating application status:", err);
        res.status(500).json({ error: "Server error" });
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

        // ✅ Safe file path deletion
        const filePath = path.resolve(__dirname, "..", application.resume);

        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("✅ Resume file deleted:", filePath);
            } else {
                console.warn("⚠️ Resume file not found, skipping deletion:", filePath);
            }
        } catch (fileError) {
            console.error("❌ Error deleting resume file:", fileError);
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
