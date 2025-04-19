const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema({
  phone: String,
  email: String,
  address: String,
  businessHours: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String,
  },
});

module.exports = mongoose.model("ContactInfo", contactInfoSchema);
