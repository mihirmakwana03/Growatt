const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
<<<<<<< HEAD
=======
    bio: { type: String, required: true },
    social: { type: String, required: true },
>>>>>>> a4bac4c (first commit)
    image: { type: String, required: true }, // Store the image filename
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);
