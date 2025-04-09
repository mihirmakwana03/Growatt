const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

// Email sending route
router.post("/send", async (req, res) => {
    console.log("📩 Email API called with data:", req.body);

    const { to, subject, name, jobTitle } = req.body;

    if (!to || !subject || !name || !jobTitle) {
        console.error("❌ Missing required fields:", { to, subject, name, jobTitle });
        return res.status(400).json({ error: "❌ Missing required fields!" });
    }

    let emailTemplatePath;
    if (subject === "selected") {
        emailTemplatePath = path.join(__dirname, '../templates/selected.html');
    } else if (subject === "unselected") {
        emailTemplatePath = path.join(__dirname, '../templates/unselected.html');
    } else {
        return res.status(400).json({ error: "❌ Invalid subject!" });
    }
    let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
    emailTemplate = emailTemplate.replace('{{NAME}}', name);
    emailTemplate = emailTemplate.replace('{{JOB_TITLE}}', jobTitle);

    if (subject === "unselected") {
        emailTemplate = emailTemplate.replace('{{JOB_TITLE}}', jobTitle);
    }

    // const pdfPath = path.join(__dirname, '../attachments/offer_letter.pdf');

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: emailTemplate,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", result);
        res.json({ success: true, message: "✅ Email sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ error: "❌ Email sending failed!" });
    }
});

// ✅ Correctly export the router
module.exports = router;
