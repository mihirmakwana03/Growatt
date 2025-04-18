const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    bio: { type: String, required: true },
    social: { type: String, required: true },
    image: { type: String, required: true }, // Store the image filename
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);
