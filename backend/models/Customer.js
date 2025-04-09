const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
  contact: { type: String, required: true, match: /^\d{10}$/ },
  service: {
    type: String,
    required: true,
    enum: ["Logo Design", "Brand Identity", "Packaging Design", "Business Card Design", "Letterheads", "Label Design", "Flex Design", "Catalog Design", "Brochure Design", "Banner Design"],
  },
  datetime: { type: Date, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
