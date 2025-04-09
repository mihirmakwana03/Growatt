const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    experience: { type: Number, required: true },
    twelvethPercentage: { type: Number, required: true },
    bachelorsDegree: { type: Number, required: true },
    resume: { type: String, required: true }, // Store file path as a string
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
