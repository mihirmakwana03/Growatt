const express = require("express");
const ContactInfo = require("../models/ContactInfo.js");

const router = express.Router();

// GET contact info
router.get("/", async (req, res) => {
  try {
    const info = await ContactInfo.findOne();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE contact info (admin only)
router.put("/", async (req, res) => {
  try {
    const updated = await ContactInfo.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
