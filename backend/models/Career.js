const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema({
    jobTitle: String,
    shortDescription: String,
    jobRequire: String,
    jobResponse: String,
    jobLocation: String,
    jobType: String,
    jobEndDate: Date, // ✅ Ensure it's stored as a Date type
});

module.exports = mongoose.model("Career", CareerSchema);


