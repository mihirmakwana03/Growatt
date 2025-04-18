const mongoose = require('mongoose');

const teamStorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    image: {
        type: String, // The image file name (to be stored in the 'membersImg' folder)
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('TeamStory', teamStorySchema);
