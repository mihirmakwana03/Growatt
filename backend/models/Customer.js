const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
  contact: { type: String, required: true, match: /^\d{10}$/ },
  service: {
    type: String,
    required: true,
    enum: ["Logo Design", "Website Development", "Digital Marketing"],
  },
  datetime: { type: Date, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
