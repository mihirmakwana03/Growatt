const express = require("express");
const axios = require("axios");
const router = express.Router();
const Contact = require("../models/Contact");
const validateContactForm = require("../utils/validateContactForm");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const path = require("path");
const RECAPTCHA_SECRET_KEY = "6LdtrvgqAAAAAN49NUdPeJRUVTnmwpUbMS7ah3Is"; // 🔹 Replace with your actual secret key

// 🛠️ Function to Verify reCAPTCHA
const verifyRecaptcha = async (token) => {
    try {
        const response = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            null,
            {
                params: {
                    secret: RECAPTCHA_SECRET_KEY,
                    response: token,
                },
            }
        );

        return response.data.success;
    } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);
        return false;
    }
};

// 📌 Route to Submit Contact Form
router.post("/submitcontact", upload.single('file'), async (req, res) => {
    try {

        console.log("📩 Received form data:", req.body);

        const { captcha, ...formData } = req.body; // Extract reCAPTCHA token

        // Step 1: Verify reCAPTCHA
        if (!captcha) {
            return res.status(400).json({ error: "reCAPTCHA is missing." });
        }

        const isHuman = await verifyRecaptcha(captcha);
        if (!isHuman) {
            return res.status(400).json({ error: "reCAPTCHA verification failed." });
        }

        console.log("✅ reCAPTCHA verified!");

        // Step 2: Validate Contact Form
        const errors = validateContactForm(formData);
        if (errors) {
            console.log("🚨 Form validation errors:", errors);  // <-- Add this
            return res.status(400).json({ error: "Validation failed", details: errors });
        }

        // Step 3: Save Contact Form Data
        const newContact = new Contact(formData);
        await newContact.save();
        res.status(201).json({ message: "Form submitted successfully!" });

    } catch (error) {
        console.error("Error in form submission:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 Route to Get All Inquiries
router.get("/inquiry", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
});

// 📌 Route to Delete a Contact
router.delete("/delete/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ error: "Failed to delete contact" });
    }
});

module.exports = router;
