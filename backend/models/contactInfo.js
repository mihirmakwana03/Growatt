const mongoose = require('mongoose');
const { link } = require('../routes/contactRoutes');

const contactInfoSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema, 'contactinfo');

module.exports = ContactInfo;