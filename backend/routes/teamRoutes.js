const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const TeamMember = require("../models/TeamMember");

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/membersImg/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Add a new team member
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        const { name, designation } = req.body;
        const newMember = new TeamMember({
            name,
            designation,
            image: req.file.filename,
        });

        await newMember.save();
        res.status(201).json({ message: "Team member added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all team members
router.get("/", async (req, res) => {
    try {
        const members = await TeamMember.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: "Error fetching team members" });
    }
});

// Delete team member by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ error: "Member not found" });

        // Delete image from server
        const imagePath = path.join(__dirname, "../public/membersImg", member.image);
        fs.unlink(imagePath, (err) => {
            if (err) console.log("Error deleting image:", err);
        });

        await TeamMember.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Team member deleted" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
