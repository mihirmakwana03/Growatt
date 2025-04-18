const express = require("express");
const axios = require("axios");
const router = express.Router();
const Contact = require("../models/Contact");
const validateContactForm = require("../utils/validateContactForm");
const ContactInfo = require("../models/ContactInfo"); // Ensure this path is correct
const multer = require("multer");
const upload = multer({ dest: 'public/contactuploadsimg' });
const path = require("path");
const RECAPTCHA_SECRET_KEY = "6LdtrvgqAAAAAN49NUdPeJRUVTnmwpUbMS7ah3Is";
const fs = require("fs");

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

// Serve uploaded contact file from 'public/contactuploadsimg'
router.get("/file/:filename", (req, res) => {
    const filePath = path.join(__dirname, "../public/contactuploadsimg", req.params.filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: "File not found" });
        }

        res.sendFile(filePath);
    });
});

// Ensure uploaded files retain their original extensions
router.post("/submitcontact", upload.single('files'), async (req, res) => {
    try {
        if (req.file) {
            const originalExtension = path.extname(req.file.originalname);
            const newFileName = `${req.file.filename}${originalExtension}`;
            const newFilePath = path.join(req.file.destination, newFileName);

            fs.renameSync(req.file.path, newFilePath);
            req.file.filename = newFileName;
            req.file.path = newFilePath;
        }

        // Proceed with the rest of the logic
        console.log("📩 Received form data:", req.body);
        console.log("📎 Uploaded file:", req.file);

        const { captcha, ...formData } = req.body;

        // Step 1: Verify reCAPTCHA
        if (!captcha) {
            return res.status(400).json({ error: "reCAPTCHA is missing." });
        }

        const isHuman = await verifyRecaptcha(captcha);
        if (!isHuman) {
            return res.status(400).json({ error: "reCAPTCHA verification failed." });
        }

        console.log("✅ reCAPTCHA verified!");

        // Step 2: Attach file info if present
        if (req.file) {
            formData.files = req.file.filename;
        } else {
            formData.files = "";
        }

        // Step 3: Validate Contact Form
        const errors = validateContactForm(formData);
        if (errors) {
            console.log("🚨 Form validation errors:", errors);
            return res.status(400).json({ error: "Validation failed", details: errors });
        }

        // Step 4: Save to DB
        const newContact = new Contact(formData);
        await newContact.save();

        res.status(201).json({ message: "Form submitted successfully!" });

    } catch (error) {
        console.error("🔥 Error in form submission:", error.message, error.stack);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 Route to Submit Contact Form
router.post("/submitcontact", upload.single('files'), async (req, res) => {
    try {
        console.log("📩 Received form data:", req.body);
        console.log("📎 Uploaded file:", req.file);

        const { captcha, ...formData } = req.body;

        // Step 1: Verify reCAPTCHA
        if (!captcha) {
            return res.status(400).json({ error: "reCAPTCHA is missing." });
        }

        const isHuman = await verifyRecaptcha(captcha);
        if (!isHuman) {
            return res.status(400).json({ error: "reCAPTCHA verification failed." });
        }

        console.log("✅ reCAPTCHA verified!");

        // Step 2: Attach file info if present
        if (req.file) {
            formData.files = req.file.filename;  // or req.file.path, depending on your config
        } else {
            formData.files = ""; // or don't assign at all
        }

        // Step 3: Validate Contact Form
        const errors = validateContactForm(formData);
        if (errors) {
            console.log("🚨 Form validation errors:", errors);
            return res.status(400).json({ error: "Validation failed", details: errors });
        }

        // Step 4: Save to DB
        const newContact = new Contact(formData);
        await newContact.save();

        res.status(201).json({ message: "Form submitted successfully!" });

    } catch (error) {
        console.error("🔥 Error in form submission:", error.message, error.stack);
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

        // Delete associated file if it exists
        if (contact.files) {
            const filePath = path.join(__dirname, "../uploads", contact.files);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("File deleted successfully:", contact.files);
                }
            });
        }

        res.json({ message: "Contact and associated file deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ error: "Failed to delete contact" });
    }
});

router.get('/info', async (req, res) => {
    try {
        console.log('Fetching contact info...');
        const contactInfo = await ContactInfo.find({});
        console.log('Data fetched:', contactInfo);
        res.json(contactInfo);
    } catch (error) {
        console.error('Error fetching contact info:', error);
        res.status(500).json({ error: 'Failed to fetch contact info' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { icon, title, content, link } = req.body;

        const newContact = new ContactInfo({ icon, title, content, link });
        await newContact.save();

        res.status(201).json({ message: 'Contact info added successfully' });
    } catch (error) {
        console.error('Error adding contact info:', error);
        res.status(500).json({ error: 'Failed to add contact info' });
    }
});

module.exports = router;
