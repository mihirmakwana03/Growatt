const express = require("express");
const router = express.Router();
const Career = require("../models/Career");
const axios = require("axios");

const RECAPTCHA_SECRET_KEY = "6LdtrvgqAAAAAN49NUdPeJRUVTnmwpUbMS7ah3Is"; // 🔹 Replace with your reCAPTCHA secret key

// ✅ Get all careers (Optionally filter expired jobs)
router.get("/", async (req, res) => {
    try {
        const { active } = req.query;

        let query = {};
        if (active === "true") {
            query.jobEndDate = { $gte: new Date() }; // ✅ Fetch jobs where jobEndDate is in the future
        }

        const careers = await Career.find(query);
        res.status(200).json(careers);
    } catch (error) {
        console.error("❌ Error fetching careers:", error);
        res.status(500).json({ message: "Error fetching careers", error });
    }
});


// ✅ Create a new career (POST Route)
router.post("/", async (req, res) => {
    try {
        const { jobTitle, shortDescription, jobLocation, jobType, jobEndDate } = req.body;

        if (!jobTitle || !shortDescription || !jobLocation || !jobType || !jobEndDate) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        let formattedEndDate = null;
        if (jobEndDate) {
            const parsedDate = new Date(jobEndDate);
            if (isNaN(parsedDate)) {
                return res.status(400).json({ message: "Invalid jobEndDate format. Use YYYY-MM-DD." });
            }
            formattedEndDate = parsedDate;
        }

        const newCareer = new Career({
            jobTitle,
            shortDescription,
            jobLocation,
            jobType,
            jobEndDate: formattedEndDate,
        });

        await newCareer.save();
        res.status(201).json({ message: "Career added successfully", career: newCareer });

    } catch (error) {
        console.error("❌ Error adding career:", error);
        res.status(500).json({ message: "Error adding career", error });
    }
});


// ✅ Handle Job Applications (with reCAPTCHA verification)
router.post("/applications", async (req, res) => {
    try {
        const { name, email, jobId, jobTitle, captcha } = req.body;

        if (!name || !email || !jobId || !jobTitle || !captcha) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // ✅ Verify reCAPTCHA token
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`;
        const { data } = await axios.post(verifyUrl);

        if (!data.success) {
            return res.status(400).json({ message: "CAPTCHA verification failed! Please try again." });
        }

        // ✅ Store application logic (you might want to save it in a database)
        console.log("✅ New Application Received:", { name, email, jobId, jobTitle });

        return res.status(200).json({ message: "Application submitted successfully!" });

    } catch (error) {
        console.error("❌ Error submitting application:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// ✅ DELETE EXPIRED CAREERS (Move this route ABOVE "/:id")
router.delete("/delete-expired", async (req, res) => {
    try {
        const now = new Date();
        const result = await Career.deleteMany({ jobEndDate: { $lt: now } });

        res.status(200).json({ message: `${result.deletedCount} expired careers deleted.` });
    } catch (error) {
        console.error("❌ Error deleting expired careers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ DELETE a career by ID (Should be the last DELETE route)
router.delete("/:id", async (req, res) => {
    try {
        const career = await Career.findByIdAndDelete(req.params.id);
        if (!career) {
            return res.status(404).json({ message: "Career not found" });
        }
        res.status(200).json({ message: "Career deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting career:", error);
        res.status(500).json({ message: "Error deleting career", error });
    }
});

module.exports = router;