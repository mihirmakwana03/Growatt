const validateContactForm = (data) => {
    const { fullName, email, phone, message } = data;
    const errors = {};

    if (!fullName || fullName.trim().length < 3) errors.fullName = "Full name must be at least 3 characters.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    if (!phone || !/^[0-9]{10,15}$/.test(phone)) errors.phone = "Enter a valid phone number (10-15 digits).";
    if (!message || message.trim().length < 5) errors.message = "Message must be at least 5 characters.";

    return Object.keys(errors).length > 0 ? errors : null;
};

module.exports = validateContactForm;
